import { test } from "client-sdk";
import { StyleSheet, Text, View } from "react-native";

import { NavigationContainer, useNavigation } from "@react-navigation/native";
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

import HomeScreen from "./Home";
import TagCameraScreen from "./TagCameraScreen";
import RegCameraScreen from "./RegCameraScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  const message = test();

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "NFTag | Home" }}
        />
        <Stack.Screen
          name="Camera"
          component={TagCameraScreen}
          options={{ title: "NFTag | Camera", headerShown: false }}
        />
        <Stack.Screen
          name="RegCamera"
          component={RegCameraScreen}
          options={{ title: "NFTag | RegCamera", headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
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
