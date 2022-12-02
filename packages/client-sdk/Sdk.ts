import {
  initPaymentSheet,
  presentPaymentSheet,
} from "@stripe/stripe-react-native";
import { SetupParams } from "@stripe/stripe-react-native/lib/typescript/src/types/PaymentSheet";
import { Unsubscribe } from "firebase/auth";
import { child, get, getDatabase, ref, set, update } from "firebase/database";
import {
  collection,
  doc,
  DocumentReference,
  DocumentSnapshot,
  getDoc,
  getFirestore,
  onSnapshot,
  setDoc,
} from "firebase/firestore";
import {
  getDownloadURL,
  getStorage,
  ref as sRef,
  UploadResult,
  uploadString,
} from "firebase/storage";
import { v4 } from "uuid";
import { shuffle } from "./shuffle";
import {
  ApproveTag,
  CreateGame,
  Game,
  JoinGame,
  ListGames,
  PauseGame,
  RejectTag,
  SetTagState,
  StartGame,
  SubmitTag,
  Tag,
} from "./types";

//#region utils
interface Subscription {
  unsubscribe?: Unsubscribe;
}
export const subscribeNextOneSnapshot = async <DocumentData>(
  docRef: DocumentReference<DocumentData>
) => {
  const sub: Subscription = { unsubscribe: undefined };
  try {
    return new Promise<DocumentSnapshot<DocumentData>>((resolve, reject) => {
      sub.unsubscribe = onSnapshot(docRef, resolve, reject);
    });
  } finally {
    const unsub = sub.unsubscribe;
    if (unsub) {
      unsub();
    }
  }
};
export const getDocumentSnapshot = async (collection: string, id: string) => {
  console.log("Sdk.getSnapshotData", "collection", collection, "id", id);
  const db = getDatabase();
  const firestore = getFirestore();
  const ref = doc(firestore, collection, id);
  const snapshot = await getDoc(ref);
  return { snapshot: snapshot.data() || undefined, ref, collection, id };
};

export const getDataRef = (path: string) => {
  console.log("Sdk.getDataRef", "path", path);
  const db = getDatabase();
  return { ref: ref(db, path), db, path };
};

export const getStorageRef = (path: string) => {
  const storage = getStorage();
  return sRef(storage, path);
};

export const getDataSnapshot = async (path: string) => {
  console.log("Sdk.getDataSnapshot", "path", path);
  const { ref } = getDataRef(path);
  const snapshot = await get(ref);
  return { snapshot, ref, path };
};

export const getCollectionRef = async (
  collectionName: string,
  path: string
) => {
  console.log(
    "Sdk.getCollectionRef",
    "collection",
    collectionName,
    "path",
    path
  );
  const db = getFirestore();
  return {
    db,
    collection: collection(db, collectionName, path),
    collectionName,
    path,
  };
};

//#endregion

interface PaymentSessionConfig {
  customer: string;
  ephemeralKeySecret: string;
  paymentIntentClientSecret: string;
}

export const capturePayment = async (uid: string) => {
  // add checkout session to customers checkout_sessions sub-collection

  // const { collection } = await getCollectionRef("customers", `${uid}/checkout_sessions`);
  // const docRef = await addDoc(collection, {
  //   client: "mobile",
  //   mode: "payment",
  //   amount: 499,
  //   currency: "usd",
  // });

  // const session = await getDataSnapshot(`customers/${uid}/checkout_sessions/${docRef.id}`);
  // const sessionConfig = session.snapshot.val() as PaymentSessionConfig;

  // console.log('Sdk.capturePayment.presentingPayment');
  // const result = await presentPayment(sessionConfig);
  // console.log('Sdk.capturePayment.returningResult');
  // return result;
  return true;
};

const presentPayment = async (config: PaymentSessionConfig) => {
  if (
    !config.customer ||
    !config.ephemeralKeySecret ||
    !config.paymentIntentClientSecret
  ) {
    return false;
  }

  const paymentSheetResult = await initPaymentSheet({
    merchantDisplayName: "NFTag App",
    customerId: config.customer,
    testEnv: true,
    customerEphemeralKeySecret: config.ephemeralKeySecret,
    paymentIntentClientSecret: config.paymentIntentClientSecret,
    applePay: {
      merchantCountryCode: "US",
    },
    googlePay: {
      merchantCountryCode: "US",
    },
  } as SetupParams);

  if (paymentSheetResult.error) {
    throw paymentSheetResult.error;
  }

  const presetResult = await presentPaymentSheet();

  if (presetResult.error) {
    throw presetResult.error;
  }
  return true;
};

//#region Games

export const createGame: CreateGame = async (name, owner) => {
  console.log("Sdk.createGame: creating game for", name, owner.uid);
  const { ref: gameRef } = getDataRef(`games`);

  const id = Math.floor(100000 + Math.random() * 900000).toString();

  // add game to user data
  const { snapshot, ref } = await getDocumentSnapshot("customers", owner.uid);
  console.log("Sdk.createGame: userSnapshot.exists", !!snapshot);

  await setDoc(
    ref,
    {
      // games: [...snapshot?.games, id],
      ownedGame: id,
    },
    { merge: true }
  );

  await set(child(gameRef, id), {
    id,
    name,
    inProgress: false,
    owner: owner.uid,
    players: {},
    tags: {},
  } as Game);

  return id;
};

export const joinGame: JoinGame = async (id, user, image) => {
  const paymentResult = await capturePayment(user.uid);
  if (!paymentResult) {
    throw new Error("Payment failed");
  }

  // ensure game exists
  const { snapshot: gameSnapshot } = await getDataSnapshot(`games/${id}`);
  if (!gameSnapshot.exists()) {
    throw new Error("Game does not exist");
  }
  // add game to user data
  const { snapshot: userSnapshot, ref: userRef } = await getDocumentSnapshot(
    "customers",
    user.uid
  );

  await setDoc(
    userRef,
    {
      // games: [...userSnapshot?.games, id],
      currentGame: id,
    },
    { merge: true }
  );

  // add player to game data
  const { ref: playersRef } = getDataRef(`games/${id}/players`);
  const player = {
    id: user.uid,
    name: user.displayName,
    image,
    active: false,
    target: "",
    tags: 0,
  };
  await set(child(playersRef, user.uid), player);
  return gameSnapshot.val();
};

export const startGame: StartGame = async (
  id,
  user,
  activatePlayers = true
) => {
  const { snapshot, ref: gameRef } = await getDataSnapshot(`games/${id}`);

  if (snapshot.val().owner !== user.uid) {
    throw new Error("Only the owner can start the game");
  }
  await update(gameRef, {
    inProgress: true,
    winner: null,
  });

  // set all players to active state
  const { snapshot: playerSnapshot, ref: playersRef } = await getDataSnapshot(
    `games/${id}/players`
  );
  const players = playerSnapshot.val();

  console.log("players", players);

  const playerIds = Object.keys(players);
  const targets = shuffle(playerIds);

  // assign each player their target from the targets map
  targets.forEach((value, key) => {
    players[key].target = value;
    players[key].active = activatePlayers;
    players[key].tags = 0;
  });

  await update(playersRef, players);
  return snapshot.val();
};

export const pauseGame: PauseGame = async (id, user) => {
  const { snapshot, ref } = await getDataSnapshot(`games/${id}`);

  if (snapshot.val().owner !== user.uid) {
    throw new Error("Only the owner can pause the game");
  }

  await update(ref, {
    inProgress: false,
  });

  return snapshot.val();
};

export const listGames: ListGames = async (user) => {
  const { snapshot } = await getDocumentSnapshot("customers", user.uid);
  const games = snapshot?.games;
  if (!games) {
    console.log("Sdk.listGames", "no games for user", user.uid);
    return [];
  }

  const gamePromises = games.map(
    async (gameId: string) =>
      (await getDataSnapshot(`games/${gameId}`))?.snapshot
  );
  const snapshots = await Promise.all(gamePromises);
  return snapshots.map((snapshot) => snapshot.val());
};

//#endregion

//#region Tags
export const submitTag: SubmitTag = async (game, user, target, image) => {
  const { ref } = getDataRef(`games/${game.id}/tags`);

  const id = v4();

  const storageRef = getStorageRef(id);

  return (await uploadString(storageRef, image.uri, "base64").then(
    async (result: UploadResult) => {
      console.log("upload complete");
      const tag = {
        id,
        timestamp: new Date().getTime(),
        image: {
          ...image,
          uri: await getDownloadURL(result.ref),
        },
        player: user.uid,
        target: target.id,
        approved: {
          approved: true, // auto approve for now
          timestamp: new Date().getTime(), // auto approve for now
        },
      };

      await set(child(ref, id), tag);
      return { tag };
    }
  )) as Tag;
};

export const setTagState: SetTagState = async (game, user, tag, approved) => {
  if (game.owner !== user.uid) {
    throw new Error("Only the owner can approve tags");
  }

  const { ref } = getDataRef(`games/${game.id}/tags/${tag.id}`);

  await update(ref, {
    approved: {
      approved,
      timestamp: new Date().getTime(),
    },
  });

  return tag;
};

export const approveTag: ApproveTag = async (game, user, tag) =>
  setTagState(game, user, tag, true);

export const rejectTag: RejectTag = async (game, user, tag) =>
  setTagState(game, user, tag, false);

//#endregion
