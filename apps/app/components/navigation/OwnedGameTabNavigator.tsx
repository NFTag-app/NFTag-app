import { GameProvider, useUser } from "client-sdk";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FeedScreen } from "../../screens/game/FeedScreen";
import { GameSettingsScreen } from "../../screens/game/GameSettingsScreen";

import { Constants, ComponentStyles, GenericOptions } from "./Styles";
import { OwnedGameTabParamList } from "./NavigationParams";
import { ShareGameScreen } from "../../screens/game/ShareGameScreen";
import { LoadingScreen } from "../../screens/LoadingScreen";
import IonIcons from "@expo/vector-icons/Ionicons";

const GameTab = createBottomTabNavigator<OwnedGameTabParamList>();

export const OwnedGameTabNavigator = (props) => {
  const user = useUser();

  return (
    <GameProvider gameId={user?.ownedGame}>
      <GameTab.Navigator initialRouteName="FeedScreen" {...props}>
        <GameTab.Screen
          name="FeedScreen"
          component={FeedScreen}
          options={{
            title: "Feed",
            tabBarIcon: ({
              focused,
              color,
              size,
            }: {
              focused: boolean;
              color: string;
              size: number;
            }) => {
              return <IonIcons name="list" size={size} color={color} />;
            },
            ...GenericOptions.headerOptions,
            ...GenericOptions.tabBarOptions,
          }}
        />
        <GameTab.Screen
          name="ShareGameScreen"
          children={(props) => (
            <ShareGameScreen gameId={user?.ownedGame} {...props} />
          )}
          options={{
            title: "Share Game",
            tabBarIcon: ({
              focused,
              color,
              size,
            }: {
              focused: boolean;
              color: string;
              size: number;
            }) => {
              return <IonIcons name="share-social" size={size} color={color} />;
            },
            ...GenericOptions.headerOptions,
            ...GenericOptions.tabBarOptions,
          }}
        />
        <GameTab.Screen
          name="GameSettingsScreen"
          component={GameSettingsScreen}
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
      </GameTab.Navigator>
    </GameProvider>
  );
};
