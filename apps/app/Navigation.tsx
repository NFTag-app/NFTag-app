import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";

import { HomeScreen } from "./Home";
import TagCameraScreen from "./TagCameraScreen";
import RegCameraScreen from "./RegCameraScreen";
import { InGameScreen } from "./InGameScreen";
import { GameListScreen } from "./GameListScreen";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "NFTag | Home" }}
        />
        <Stack.Screen
          name="TagCamera"
          component={TagCameraScreen}
          options={{ title: "NFTag | TagCamera", headerShown: false }}
        />
        <Stack.Screen
          name="RegCamera"
          component={RegCameraScreen}
          options={{ title: "NFTag | RegCamera", headerShown: false }}
        />
        <Stack.Screen
          name="InGameScreen"
          component={InGameScreen}
          options={{ title: "NFTag | Current Game" }}
        />
        <Stack.Screen
          name="GameListScreen"
          component={GameListScreen}
          options={{ title: "NFTag | Game List" }}
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
