import { getAuth } from "firebase/auth";
import { collection, doc, getFirestore, onSnapshot } from "firebase/firestore";
import React, { createContext, useContext, useEffect, useState } from "react";
import { UserData } from "./types";

const UserContext = createContext<UserData | null>(null);

const UserProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [user, setUser] = useState<UserData | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const auth = getAuth();
  const db = getFirestore();

  useEffect(() => {
    if (!user || ready) return;

    setReady(true);

    return onSnapshot(
      doc(collection(db, "customers"), user.uid),
      (snapshot) => {
        if (!snapshot.exists()) return;

        const data = snapshot.data();
        console.log("data", data);

        if (!("games" in data!)) {
          data!["games"] = [];
        }

        setUser({
          ...user,
          ...data,
        } as UserData);
      }
    );
  }, [user]);

  useEffect(() => {
    return auth.onAuthStateChanged((user) => {
      console.log("authstate", user?.displayName);

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

export const useUser = () => {
  const context = useContext(UserContext);

  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }

  console.log("context", context?.displayName);

  return context;
};
