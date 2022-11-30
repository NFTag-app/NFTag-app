import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { GameListScreen } from "../../screens/GameListScreen";
import { JoinGameScreen } from "../../screens/JoinGameScreen";
import { CreateGameScreen } from "../../screens/CreateGameScreen";
import { SettingsScreen } from "../../screens/SettingsScreen";

import { Constants, ComponentStyles, GenericOptions } from "./Styles";
import { HomeTabParamList } from "./NavigationParams";

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator initialRouteName="GameList">
      <HomeTab.Screen
        name="GameList"
        component={GameListScreen}
        options={{
          title: "Game List",
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
      <HomeTab.Screen
        name="JoinGame"
        children={(props) => (
          <JoinGameScreen tabHeight={Constants.tabHeight} {...props} />
        )} // This is how we pass props to a component
        options={{
          headerShown: false,
          title: "Join Game",
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
      {/* <HomeTab.Screen
        name="CreateGame"
        component={CreateGameScreen}
        options={{
          title: "Create Game",
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      /> */}
      <HomeTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
    </HomeTab.Navigator>
  );
};
