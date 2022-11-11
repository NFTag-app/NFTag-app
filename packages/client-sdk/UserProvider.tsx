import { getAuth, User } from "firebase/auth";
import React, { createContext, useContext, useState } from "react";

const UserContext = createContext<User | null>(null);

const UserProvider: React.FC<{
	children: React.ReactNode;
}> = ({ children }) => {
	const [user, setUser] = useState<User | null>(null);
	const auth = getAuth();

	auth.onAuthStateChanged((user) => {
		console.log("authstate", user?.displayName);
		setUser(user);
	});

	return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
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
