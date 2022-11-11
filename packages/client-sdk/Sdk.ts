import { child, get, getDatabase, push, ref, update } from "firebase/database";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { uuid } from "uuidv4";
import {
  CreateGame,
  Game,
  JoinGame,
  ListGames,
  PauseGame,
  Player,
  StartGame,
} from "./types";

export const capturePayment = async () =>
  new Promise((resolve) => resolve(true));

//#region Games

export const createGame: CreateGame = async (name, owner) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const gameRef = ref(db, `games`);
    push(child(gameRef, uuid()), {
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
  return new Promise((resolve, reject) => {
    if (!capturePayment()) reject(new Error("Payment failed"));

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

//#region Teams

//#endregion

//#region Tags

//#endregion
