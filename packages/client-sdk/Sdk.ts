import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { SetupParams } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";
import { child, get, getDatabase, push, ref, update } from "firebase/database";
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import { uuid } from "uuidv4";
import {
  ApproveTag,
  CreateGame,
  Game,
  JoinGame,
  ListGames,
  PauseGame,
  Player,
  RejectTag,
  SetTagState,
  StartGame,
  SubmitTag,
} from "./types";

export const capturePayment = async (uid: string) => {
  // return new Promise((resolve) => resolve(true));
  // add checkout session to customers checkout_sessions sub-collection

  return new Promise((resolve, reject) => {
    const db = getFirestore();
    const docRef = collection(db, "customers", uid, "checkout_sessions");

    addDoc(docRef, {
      client: "mobile",
      mode: "payment",
      amount: 499,
      currency: "usd",
    }).then((docRef) => {
      onSnapshot(docRef, async (doc) => {
        const { customer, ephemeralKeySecret, paymentIntentClientSecret } =
          doc.data() as any;

        if (!customer || !ephemeralKeySecret || !paymentIntentClientSecret)
          return;

        console.log(customer, ephemeralKeySecret, paymentIntentClientSecret);

        initPaymentSheet({
          merchantDisplayName: "NFTag App",
          customerId: customer,
          testEnv: true,
          customerEphemeralKeySecret: ephemeralKeySecret,
          paymentIntentClientSecret: paymentIntentClientSecret,
          applePay: {
            merchantCountryCode: "US",
          },
          googlePay: {
            merchantCountryCode: "US",
          },
        } as SetupParams).then(({ error }) => {
          if (error) reject(error);

          presentPaymentSheet().then(({ error }) => {
            if (error) reject(error);
            resolve(true);
          });
        });
      });
    });
  });
};

//#region Games

export const createGame: CreateGame = async (name, owner) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const gameRef = ref(db, `games`);

    const id = uuid();

    push(child(gameRef, id), {
      id,
      name,
      inProgress: false,
      owner: owner.uid,
      players: {},
      tags: {},
    } as Game)
      .then((ref) => {
        get(ref)
          .then((snapshot) => {
            resolve(snapshot.val());
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        console.log("error", error);
        reject(error);
      });
  });
};

export const joinGame: JoinGame = async (id, user, image) => {
  return new Promise(async (resolve, reject) => {
    if ((await capturePayment(user.uid)) !== true)
      reject(new Error("Payment failed"));

    const db = getDatabase();
    const firestore = getFirestore();

    // ensure game exists
    get(ref(db, `games/${id}`)).then((snapshot) => {
      if (!snapshot.exists()) reject(new Error("Game does not exist"));

      // add game to user data
      const userRef = doc(firestore, "customers", user.uid);
      getDoc(userRef)
        .then((snapshot: DocumentSnapshot<DocumentData>) => {
          setDoc(
            userRef,
            {
              games: [...snapshot.data()?.games, id],
            },
            { merge: true }
          );
        })
        .catch((error) => {
          console.log("error", error);
          reject(error);
        });

      // add player to game data
      const playersRef = ref(db, `games/${id}/players`);
      push(child(playersRef, user.uid), {
        id: user.uid,
        name: user.displayName,
        image,
        active: false,
        target: "",
        tags: [],
      } as Player).then((ref) => {
        get(ref)
          .then((snapshot) => {
            resolve(snapshot.val());
          })
          .catch((error) => {
            reject(error);
          });
      });
    });
  });
};

export const startGame: StartGame = async (
  id,
  user,
  activatePlayers = true
) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${id}`);
    get(gameRef)
      .then((snapshot) => {
        if (snapshot.val().owner !== user.uid)
          reject(new Error("Only the owner can start the game"));
        else {
          update(gameRef, {
            inProgress: true,
          });

          // set all players to active state
          const playersRef = ref(db, `games/${id}/players`);
          get(playersRef).then((snapshot) => {
            const players = snapshot.val();
            Object.keys(players).forEach((playerId) => {
              update(ref(db, `games/${id}/players/${playerId}`), {
                active: true,
              });
            });
          });

          resolve(snapshot.val());
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const pauseGame: PauseGame = async (id, user) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const gameRef = ref(db, `games/${id}`);
    get(gameRef)
      .then((snapshot) => {
        if (snapshot.val().owner !== user.uid)
          reject(new Error("Only the owner can pause the game"));
        else {
          update(gameRef, {
            inProgress: false,
          });
          resolve(snapshot.val());
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const listGames: ListGames = async (user) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const firestore = getFirestore();

    const userRef = doc(firestore, "customers", user.uid);
    getDoc(userRef)
      .then((snapshot: DocumentSnapshot<DocumentData>) => {
        const games = snapshot.data()?.games;
        if (!games) reject(new Error("No games found"));

        const gamePromises = games.map((gameId: string) =>
          get(ref(db, `games/${gameId}`))
        );
        Promise.all(gamePromises)
          .then((snapshots) => {
            const games = snapshots.map((snapshot) => snapshot.val());
            resolve(games);
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        console.log("error", error);
        reject(error);
      });
  });
};

//#endregion

//#region Tags
export const submitTag: SubmitTag = async (game, user, target, image) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const tagRef = ref(db, `games/${game.id}/tags`);

    const id = uuid();

    push(child(tagRef, id), {
      id,
      timestamp: new Date().getTime(),
      image,
      player: user.uid,
      target: target.id,
      approved: {
        approved: null,
        timestamp: new Date().getTime(),
      },
    })
      .then((ref) => {
        get(ref)
          .then((snapshot) => {
            resolve(snapshot.val());
          })
          .catch((error) => {
            reject(error);
          });
      })
      .catch((error) => {
        console.log("error", error);
        reject(error);
      });
  });
};

export const setTagState: SetTagState = async (game, user, tag, approved) => {
  return new Promise((resolve, reject) => {
    if (game.owner !== user.uid)
      reject(new Error("Only the owner can approve tags"));

    const db = getDatabase();
    const tagRef = ref(db, `games/${game.id}/tags/${tag.id}`);

    update(tagRef, {
      approved: {
        approved,
        timestamp: new Date().getTime(),
      },
    });
  });
};

export const approveTag: ApproveTag = async (game, user, tag) =>
  setTagState(game, user, tag, true);

export const rejectTag: RejectTag = async (game, user, tag) =>
  setTagState(game, user, tag, false);

//#endregion
