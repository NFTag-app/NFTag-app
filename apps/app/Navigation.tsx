import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { InGameStackParamList, RootStackParamList } from "./RootStackParams";

import { GameProvider, useUser } from "client-sdk";
import CreateGameScreen from "./CreateGameScreen";
import { GameListScreen } from "./GameListScreen";
import { HomeScreen } from "./Home";
import { InGameScreen } from "./InGameScreen";
import JoinGameScreen from "./JoinGameScreen";
import RegCameraScreen from "./RegCameraScreen";
import { TagCameraScreen } from "./TagCameraScreen";

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
      <InGameStack.Screen
        name="TagCameraScreen"
        component={TagCameraScreen}
        options={{ title: "NFTag | Camera", headerShown: false }}
      />
    </InGameStack.Navigator>
  );
};

export default function Navigation() {
  const user = useUser();

  if (!user) return <HomeScreen />;

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="GameListScreen">
        <Stack.Screen
          name="RegCamera"
          component={RegCameraScreen}
          options={{ title: "NFTag | Camera", headerShown: false }}
        />

        <Stack.Screen
          name="GameNavigatorScreen"
          component={GameNavigatorScreen}
          options={{ title: "NFTag | Current Game", headerShown: false }}
        />
        <Stack.Screen
          name="GameListScreen"
          component={GameListScreen}
          options={{
            title: "NFTag | Game List",
            headerTintColor: "#695895",
            headerStyle: {
              backgroundColor: "#25262b",
            },
          }}
        />
        <Stack.Screen
          name="CreateGameScreen"
          component={CreateGameScreen}
          options={{
            title: "NFTag | Join Game",
            headerTintColor: "#695895",
            headerStyle: {
              backgroundColor: "#25262b",
            },
          }}
        />
        <Stack.Screen
          name="JoinGameScreen"
          component={JoinGameScreen}
          options={{
            title: "NFTag | Join Game",
            headerTintColor: "#695895",
            headerStyle: {
              backgroundColor: "#25262b",
            },
          }}
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
