import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { JoinGameScreen } from "../../screens/JoinGameScreen";
import { SettingsScreen } from "../../screens/SettingsScreen";

import { Constants, ComponentStyles, GenericOptions } from "./Styles";
import { HomeTabParamList } from "./NavigationParams";
import { HomeScreen } from "../../screens/home/HomeScreen";
import { CreateGameScreen } from "../../screens/home/CreateGameScreen";
import IonIcons from "@expo/vector-icons/Ionicons";

const HomeTab = createBottomTabNavigator<HomeTabParamList>();

export const HomeTabNavigator = () => {
  return (
    <HomeTab.Navigator initialRouteName="HomeScreen">
      <HomeTab.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{
          title: "Home",
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => {
            return <IonIcons name="home" size={size} color={color} />;
          },
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
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => {
            return (
              <IonIcons name="game-controller" size={size} color={color} />
            );
          },
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
      <HomeTab.Screen
        name="CreateGame"
        component={CreateGameScreen}
        options={{
          title: "Create Game",
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => {
            return <IonIcons name="add-circle" size={size} color={color} />;
          },
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
      <HomeTab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          title: "Settings",
          tabBarIcon: ({
            focused,
            color,
            size,
          }: {
            focused: boolean;
            color: string;
            size: number;
          }) => {
            return <IonIcons name="settings" size={size} color={color} />;
          },
          ...GenericOptions.headerOptions,
          ...GenericOptions.tabBarOptions,
        }}
      />
    </HomeTab.Navigator>
  );
};
