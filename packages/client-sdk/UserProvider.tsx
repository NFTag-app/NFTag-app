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

        //console.log("data", snapshot.data());

        const data = snapshot.data();

        if (!("games" in data!)) {
          data!["games"] = [];
        }

        setUser({
          ...user,
          ...data,
        } as UserData);
      },
      console.error
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
  auth.signOut();
};

export default UserProvider;

export const useGames = () => {
  const user = useUser();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    if (!user) return;

    listGames(user).then((games) => setGames(games));
  }, [user]);

  return games;
};

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  return context;
};
