import FontAwesome from "@expo/vector-icons/FontAwesome";
import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import { getApps, initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  signInWithCredential,
} from "firebase/auth";
import * as React from "react";
import { useWindowDimensions } from "react-native";
import { firebaseConfig } from "./firebase-config";

if (getApps().length < 1) {
  initializeApp(firebaseConfig);
}

WebBrowser.maybeCompleteAuthSession();

const GoogleSignIn = () => {
  const dims = useWindowDimensions();

  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "661572892323-1inpo2hpgniru8kmmr5jh9u6psc8mnhb.apps.googleusercontent.com",
    scopes: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
  });

  const auth = getAuth();

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params;
      const credential = GoogleAuthProvider.credential(id_token);
      signInWithCredential(auth, credential)
        .catch(ex => console.log(`GoogleSignin.signInWithCredential.error`, ex));
    }
  }, [response]);

  return (
    <FontAwesome.Button
      name="google"
      size={40}
      backgroundColor="#6741d9"
      style={
        {
          // fontFamily: "Roboto",
        }
      }
      onPress={() =>
        promptAsync({
          useProxy: true,
        })
      }
    >
      Sign In with Google
    </FontAwesome.Button>
  );
};

export default GoogleSignIn;
