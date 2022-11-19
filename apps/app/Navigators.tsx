import { useUser, GameProvider } from "client-sdk";
import { StyleSheet } from "react-native";

import { useSafeAreaInsets } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "./screens/LoginScreen";
import { GameListScreen } from "./screens/GameListScreen";
import { JoinGameScreen } from "./screens/JoinGameScreen";
import { Feed } from "./screens/Feed";
import { TagCameraScreen } from "./screens/TagCameraScreen";
import TargetScreen from "./screens/TargetScreen";
import { RootStackParamList } from "./RootParams";
import { SettingsScreen } from "./screens/SettingsScreen";
import CreateGameScreen from "./screens/CreateGameScreen";

const RootStack = createStackNavigator<RootStackParamList>();
const HomeTab = createBottomTabNavigator();
const GameTab = createBottomTabNavigator();

//const insets = useSafeAreaInsets(); // We'd have to do this in each tab navigator and set the height there
//const tabHeight = insets.bottom + 49;
const tabHeight = 49;

export const RootStackNavigator = () => {
  const user = useUser();

  if (!user) return <LoginScreen />;

  return (
    <NavigationContainer>
      <RootStack.Navigator initialRouteName="HomeTabs">
        <RootStack.Screen
          name="HomeTabs"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="GameTabs"
          component={GameTabNavigatorScreen}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator initialRouteName="GameList">
      <HomeTab.Screen
        name="GameList"
        component={GameListScreen}
        options={{
          title: "Game List",
          ...genericHeaderOptions,
          ...genericTabBarOptions,
        }}
      />
      <HomeTab.Screen
        name="JoinGame"
        children={(props) => (
          <JoinGameScreen tabHeight={tabHeight} {...props} />
        )} // This is how we pass props to a component
        options={{
          headerShown: false,
          title: "Join Game",
          ...genericHeaderOptions,
          ...genericTabBarOptions,
        }}
      />
      <HomeTab.Screen
        name="CreateGame"
        component={CreateGameScreen}
        options={{
          title: "Create Game",
          ...genericHeaderOptions,
          ...genericTabBarOptions,
        }}
      />
      <HomeTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          ...genericHeaderOptions,
          ...genericTabBarOptions,
        }}
      />
    </HomeTab.Navigator>
  );
};

const GameTabNavigatorScreen = ({ route }) => {
  const gameId = route.params?.gameId;
  return (
    <GameProvider gameId={gameId}>
      <GameTabNavigator />
    </GameProvider>
  );
};

const GameTabNavigator = () => {
  return (
    <GameTab.Navigator initialRouteName="Feed">
      <GameTab.Screen
        name="Feed"
        component={Feed}
        options={{
          title: "Feed",
          ...genericHeaderOptions,
          ...genericTabBarOptions,
        }}
      />
      <GameTab.Screen
        name="TagScreen"
        children={(props) => (
          <TagCameraScreen tabHeight={tabHeight} {...props} />
        )} // This is how we pass props to a component
        options={{
          headerShown: false,
          title: "Tag",
          ...genericHeaderOptions,
          ...genericTabBarOptions,
        }}
      />
      <GameTab.Screen
        name="TargetScreen"
        component={TargetScreen}
        options={{
          title: "Target",
          ...genericHeaderOptions,
          ...genericTabBarOptions,
        }}
      />
    </GameTab.Navigator>
  );
};

const headerStyle = {
  backgroundColor: "#25262b",
  borderBottomColor: "#695895",
  borderBottomWidth: 1,
  elevation: 0, // android
  shadowOffset: {
    // for iOS
    width: 0,
    height: 0,
  },
};

const genericHeaderOptions = {
  headerShadowVisible: true,
  headerTintColor: "#695895",
  headerStyle: headerStyle,
};
const tabBarStyle = {
  height: tabHeight,
  backgroundColor: "#25262b",
  borderTopColor: "#695895",
  borderTopWidth: 1,
  elevation: 0, // android
  shadowOffset: {
    // for iOS
    width: 0,
    height: 0,
  },
};
const genericTabBarOptions = {
  tabBarActiveBackgroundColor: "#25262b", //something
  //tabBarBackground: can use a function that returns a background image or something
  tabBarActiveTintColor: "#695895",
  tabBarStyle: tabBarStyle,
};
