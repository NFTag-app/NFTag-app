import { test, UserProvider } from "client-sdk";
import { StyleSheet } from "react-native";

import Navigation from "./Navigation";

export default function App() {
  const message = test();

  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
