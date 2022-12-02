import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { listGames } from "./Sdk";
import { Game, UserData } from "./types";

const UserContext = createContext<UserData | null>(null);

const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (!user) return;
    setReady(true);
  }, [user]);

  useEffect(() => {
    if (!ready) return;

    return onSnapshot(
      doc(collection(db, "customers"), user!.uid),
      (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.data();

        console.log("UserProvider.onSnapshot", data);

        if (!("games" in data!)) {
          data!["games"] = [];
        }

        setUser({
          ...user,
          ...data,
        } as UserData);
      },
      (error) => console.log(`UserProvider.onSnapshot.error`, error)
    );
  }, [ready]);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      setUser(user as UserData);
    });
  }, []);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export const signOut = () => {
  const auth = getAuth();
  return auth.signOut();
};

export default UserProvider;

export const useGames = () => {
  const user = useUser();
  const [games, setGames] = useState<Game[]>([]);
  const [loaded, setLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (!user) return;

    listGames(user)
      .then((games) => {
        setGames(games);
        setLoaded(true);
      })
      .catch((error) => console.log("failed to list games for user", error));
  }, [user]);

  return { games, loaded };
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
