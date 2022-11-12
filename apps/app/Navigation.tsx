import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { InGameStackParamList, RootStackParamList } from "./RootStackParams";

import { HomeScreen } from "./Home";
import { TagCameraScreen } from "./TagCameraScreen";
import RegCameraScreen from "./RegCameraScreen";
import { InGameScreen } from "./InGameScreen";
import { GameListScreen } from "./GameListScreen";
import { GameProvider } from "client-sdk";

const Stack = createNativeStackNavigator<RootStackParamList>();
const InGameStack = createStackNavigator<InGameStackParamList>();

const GameNavigatorScreen = ({ route }) => {
  const gameId = route.params?.gameId;
  return (
    <GameProvider gameId={gameId}>
      <GameNavigator />
    </GameProvider>
  );
};

const GameNavigator = () => {
  return (
    <InGameStack.Navigator>
      <InGameStack.Screen name="InGameScreen" component={InGameScreen} />
      <InGameStack.Screen name="TagCameraScreen" component={TagCameraScreen} />
    </InGameStack.Navigator>
  );
};

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
          name="RegCamera"
          component={RegCameraScreen}
          options={{ title: "NFTag | RegCamera", headerShown: false }}
        />

        <Stack.Screen
          name="GameNavigatorScreen"
          component={GameNavigatorScreen}
          options={{ title: "NFTag | Current Game", headerShown: false }}
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
