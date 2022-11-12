import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { SetupParams } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";
import {
  child,
  get,
  getDatabase,
  push,
  ref,
  set,
  update,
} from "firebase/database";
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
import { v4 } from "uuid";
import { shuffle } from "./shuffle";
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
          if (error) return reject(error);

          presentPaymentSheet().then(({ error }) => {
            if (error) return reject(error);
            return resolve(true);
          });
        });
      });
    });
  });
};

//#region Games

export const createGame: CreateGame = async (name, owner) => {
  const db = getDatabase();
  const firestore = getFirestore();
  const gameRef = ref(db, `games`);

  const id = Math.floor(100000 + Math.random() * 900000).toString();

  // add game to user data
  const userRef = doc(firestore, "customers", owner.uid);
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
      throw error;
    });

  return set(child(gameRef, id), {
    id,
    name,
    inProgress: false,
    owner: owner.uid,
    players: {},
    tags: {},
  } as Game).then(() => {
    return id;
  });
};

export const joinGame: JoinGame = async (id, user, image) => {
  return new Promise(async (resolve, reject) => {
    if ((await capturePayment(user.uid)) !== true)
      return reject(new Error("Payment failed"));

    const db = getDatabase();
    const firestore = getFirestore();

    // ensure game exists
    get(ref(db, `games/${id}`)).then((snapshot) => {
      if (!snapshot.exists()) return reject(new Error("Game does not exist"));

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
          return reject(error);
        });

      // add player to game data
      const playersRef = ref(db, `games/${id}/players`);
      push(child(playersRef, user.uid), {
        id: user.uid,
        name: user.displayName,
        image,
        active: false,
        target: "",
        tags: 0,
      } as Player).then((ref) => {
        get(ref)
          .then((snapshot) => {
            return resolve(snapshot.val());
          })
          .catch((error) => {
            return reject(error);
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
      .then(async (snapshot) => {
        if (snapshot.val().owner !== user.uid)
          return reject(new Error("Only the owner can start the game"));
        else {
          await update(gameRef, {
            inProgress: true,
            winner: null,
          });

          // set all players to active state
          const playersRef = ref(db, `games/${id}/players`);
          await get(playersRef).then(async (snapshot) => {
            const players = snapshot.val();

            console.log("players", players);

            const playerIds = Object.keys(players);
            const targets = shuffle(playerIds);

            // assign each player their target from the targets map
            targets.forEach((value, key) => {
              players[key].target = value;
              players[key].active = activatePlayers;
              players[key].tags = 0;
            });

            await update(ref(db, `games/${id}/players`), players);
          });

          return resolve(snapshot.val());
        }
      })
      .catch((error) => {
        return reject(error);
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
          return reject(new Error("Only the owner can pause the game"));
        else {
          update(gameRef, {
            inProgress: false,
          });
          resolve(snapshot.val());
        }
      })
      .catch((error) => {
        return reject(error);
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
        if (!games) return reject(new Error("No games found"));

        const gamePromises = games.map((gameId: string) =>
          get(ref(db, `games/${gameId}`))
        );
        Promise.all(gamePromises)
          .then((snapshots) => {
            const games = snapshots.map((snapshot) => snapshot.val());
            resolve(games);
          })
          .catch((error) => {
            return reject(error);
          });
      })
      .catch((error) => {
        return reject(error);
      });
  });
};

//#endregion

//#region Tags
export const submitTag: SubmitTag = async (game, user, target, image) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const tagRef = ref(db, `games/${game.id}/tags`);

    const id = v4();

    set(child(tagRef, id), {
      id,
      timestamp: new Date().getTime(),
      image,
      player: user.uid,
      target: target.id,
      approved: {
        approved: true, // auto approve for now
        timestamp: new Date().getTime(), // auto approve for now
      },
    }).then(() => {
      update(ref(db, `games/${game.id}/players/${target}`), {
        active: false,
      }).then(() => {
        update(ref(db, `games/${game.id}/players/${user.uid}`), {
          tags: (game.players[user.uid].tags || 0) + 1,
          target: Object.values(game.players).filter(
            (player: Player) => player.active
          )[0].id,
        }).then(() => {
          get(ref(db, `games/${game.id}/players`)).then((snapshot) => {
            const players = snapshot
              .val()
              .filter((player: Player) => player.active);

            if (players.length < 2) {
              // game is over
              update(ref(db, `games/${game.id}`), {
                inProgress: false,
                winner: user.uid,
              });
            }
          });
        });
      });
    });
  });
};

export const setTagState: SetTagState = async (game, user, tag, approved) => {
  return new Promise((resolve, reject) => {
    if (game.owner !== user.uid)
      return reject(new Error("Only the owner can approve tags"));

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
