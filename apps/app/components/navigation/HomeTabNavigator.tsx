import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { JoinGameScreen } from "../../screens/JoinGameScreen";
import { SettingsScreen } from "../../screens/SettingsScreen";

import { Constants, ComponentStyles, GenericOptions } from "./Styles";
import { HomeTabParamList } from "./NavigationParams";
import { HomeScreen } from "../../screens/home/HomeScreen";
import { CreateGameScreen } from "../../screens/home/CreateGameScreen";

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator initialRouteName="HomeScreen">
      <HomeTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
      <HomeTab.Screen
        name="JoinGame"
        children={(props) => (
          <JoinGameScreen tabHeight={Constants.tabHeight} {...props} />
        )}
        options={{
          headerShown: false,
          title: "Join Game",
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
      <HomeTab.Screen
        name="CreateGame"
        component={CreateGameScreen}
        options={{
          title: "Create Game",
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
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
