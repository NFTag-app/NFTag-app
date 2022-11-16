import { StyleSheet } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createStackNavigator } from "@react-navigation/stack";

import { InGameStackParamList, RootStackParamList } from "./RootStackParams";

import { GameProvider, useUser } from "client-sdk";
import CreateGameScreen from "./screens/CreateGameScreen";
import { GameListScreen } from "./screens/GameListScreen";
import { HomeScreen } from "./screens/Home";
import { InGameScreen } from "./screens/InGameScreen";
import { JoinGameScreen } from "./screens/JoinGameScreen";
import { TagCameraScreen } from "./screens/TagCameraScreen";
import TargetScreen from "./screens/TargetScreen";

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
      <InGameStack.Screen
        name="InGameScreen"
        component={InGameScreen}
        options={{
          title: "Feed",
          headerTintColor: "#695895",
          headerStyle: {
            backgroundColor: "#25262b",
          },
        }}
      />
      <InGameStack.Screen
        name="TagCameraScreen"
        component={TagCameraScreen}
        options={{ title: "Camera", headerShown: false }}
      />
      <InGameStack.Screen
        name="TargetScreen"
        component={TargetScreen}
        options={{
          title: "Target",
          headerTintColor: "#695895",
          headerStyle: {
            backgroundColor: "#25262b",
          },
        }}
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
          name="GameNavigatorScreen"
          component={GameNavigatorScreen}
          options={{ title: "Current Game", headerShown: false }}
        />
        <Stack.Screen
          name="GameListScreen"
          component={GameListScreen}
          options={{
            headerShadowVisible: true,
            title: "Games",
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
            title: "Create Game",
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
            title: "Join Game",
            headerTintColor: "#695895",
            headerShown: false,
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
