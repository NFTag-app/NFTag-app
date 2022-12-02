import { GameProvider, useUser } from "client-sdk";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FeedScreen } from "../../screens/game/FeedScreen";
import { GameSettingsScreen } from "../../screens/game/GameSettingsScreen";

import { Constants, ComponentStyles, GenericOptions } from "./Styles";
import { OwnedGameTabParamList } from "./NavigationParams";
import { ShareGameScreen } from "../../screens/game/ShareGameScreen";
import { LoadingScreen } from "../../screens/LoadingScreen";

const GameTab = createBottomTabNavigator<OwnedGameTabParamList>();

export const OwnedGameTabNavigator = (props) => {
  const user = useUser();

  return (
    <GameProvider gameId={user.ownedGame}>
      <GameTab.Navigator initialRouteName="FeedScreen" {...props}>
        <GameTab.Screen
          name="FeedScreen"
          component={FeedScreen}
          options={{
            title: "Feed",
            ...GenericOptions.headerOptions,
            ...GenericOptions.tabBarOptions,
          }}
        />
        <GameTab.Screen
          name="ShareGameScreen"
          children={(props) => (
            <ShareGameScreen gameId={user.ownedGame} {...props} />
          )}
          options={{
            title: "Share Game",
            ...GenericOptions.headerOptions,
            ...GenericOptions.tabBarOptions,
          }}
        />
        <GameTab.Screen
          name="GameSettingsScreen"
          component={GameSettingsScreen}
          options={{
            title: "Settings",
            ...GenericOptions.headerOptions,
            ...GenericOptions.tabBarOptions,
          }}
        />
      </GameTab.Navigator>
    </GameProvider>
  );
};
