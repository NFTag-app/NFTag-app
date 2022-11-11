import { test, UserProvider } from "client-sdk";
import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

import CameraScreen from "./Camera";
import HomeScreen from "./Home";
import RegCameraScreen from "./RegCamera";
import Navigation from "./Navigation";

const Stack = createNativeStackNavigator<RootStackParamList>();

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
