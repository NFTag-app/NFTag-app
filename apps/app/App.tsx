import { StripeProvider } from "@stripe/stripe-react-native";
import { UserProvider } from "client-sdk";
import React from "react";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootStackNavigator } from "./Navigators";

export default function App() {
  LogBox.ignoreLogs([
    "AsyncStorage has been extracted from react-native core",
    "`new NativeEventEmitter()` was called with a non-null argument without",
  ]); //expo/firebase/package problems
  return (
    <StripeProvider
      publishableKey="pk_test_51M2QcDApKRPH30eqx8ndKz3OJiXnFeP9zNt44soJ63WC6p8N6It01SsRGL3W0Rd2ZhdKknYU5H1XpGONXLUohHSe00FeN0Q3bw"
      urlScheme="nftag" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.nftag.app" // required for Apple Pay
    >
      <UserProvider>
        <SafeAreaProvider>
          {/* <Navigation /> */}
          {/* <RootTabNavigator /> */}
          <RootStackNavigator />
        </SafeAreaProvider>
      </UserProvider>
    </StripeProvider>
  );
}
