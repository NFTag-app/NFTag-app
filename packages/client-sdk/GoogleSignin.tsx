import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { getApps, initializeApp } from "firebase/app";
import {
	getAuth,
	GoogleAuthProvider,
	signInWithCredential,
} from "firebase/auth";
import * as React from "react";
import { Button } from "react-native";
import { firebaseConfig } from "./firebase-config";

if (getApps().length < 1) {
	initializeApp(firebaseConfig);
}

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
	const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
		clientId:
			"661572892323-1inpo2hpgniru8kmmr5jh9u6psc8mnhb.apps.googleusercontent.com",
	});

	const auth = getAuth();

	React.useEffect(() => {
		if (response?.type === "success") {
			const { id_token } = response.params;
			const credential = GoogleAuthProvider.credential(id_token);
			signInWithCredential(auth, credential);
		}
	}, [response]);

	return (
		<Button
			disabled={!request}
			title="Sign in with Google"
			onPress={() => {
				promptAsync({
					useProxy: true,
				});
			}}
		/>
	);
};

export default GoogleSignIn;
