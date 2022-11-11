import { child, get, getDatabase, push, ref } from "firebase/database";
import {
  doc,
  DocumentData,
  DocumentSnapshot,
  getDoc,
  getFirestore,
  setDoc,
} from "firebase/firestore";
import { uuid } from "uuidv4";
import { CreateGame, Game, JoinGame, ListGames, Player } from "./types";

export const capturePayment = async () =>
  new Promise((resolve) => resolve(true));

export const createGame: CreateGame = async (name, owner) => {
  return new Promise((resolve, reject) => {
    const db = getDatabase();
    const gameRef = ref(db, `games`);
    push(child(gameRef, uuid()), {
      name,
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

export const joinGame: JoinGame = async (id, user) => {
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
        image: user.photoURL,
        alive: true,
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
