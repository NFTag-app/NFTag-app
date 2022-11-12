import { StripeProvider } from "@stripe/stripe-react-native";
import { UserProvider } from "client-sdk";
import React from "react";

import Navigation from "./Navigation";

export default function App() {
  return (
    <StripeProvider
      publishableKey="pk_test_51M2QcDApKRPH30eqx8ndKz3OJiXnFeP9zNt44soJ63WC6p8N6It01SsRGL3W0Rd2ZhdKknYU5H1XpGONXLUohHSe00FeN0Q3bw"
      urlScheme="nftag" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.nftag.app" // required for Apple Pay
    >
      <UserProvider>
        <Navigation />
      </UserProvider>
    </StripeProvider>
  );
}
