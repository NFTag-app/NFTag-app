import { GameProvider, useGame, useUser } from "client-sdk";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FeedScreen } from "../../screens/game/FeedScreen";
import { TagCameraScreen } from "../../screens/game/TagCameraScreen";
import { TargetScreen } from "../../screens/game/TargetScreen";
import { GameSettingsScreen } from "../../screens/game/GameSettingsScreen";

import { Constants, ComponentStyles, GenericOptions } from "./Styles";
import { GameTabParamList } from "./NavigationParams";
import { ShareGameScreen } from "../../screens/game/ShareGameScreen";
import { LoadingScreen } from "../../screens/LoadingScreen";

const GameTab = createBottomTabNavigator<GameTabParamList>();

const GameTabNavigator = (props) => {
  const game = useGame();
  const user = useUser();

  const renderOwnerOnlyTabs = () => {
    const renderOwnerOnlyPreStart = () => {
      console.log(!game?.inProgress);
      if (!game?.inProgress) {
        return (
          <GameTab.Screen
            name="ShareGameScreen"
            children={(props) => (
              <ShareGameScreen gameId={game.id} {...props} />
            )}
            options={{
              title: "Share Game",
              ...GenericOptions.headerOptions,
              ...GenericOptions.tabBarOptions,
            }}
          />
        );
      }
      return undefined;
    };
    if (game?.owner === user?.uid && game?.owner !== undefined) {
      return (
        <>
          {renderOwnerOnlyPreStart()}
          <GameTab.Screen
            name="GameSettingsScreen"
            component={GameSettingsScreen}
            options={{
              title: "Settings",
              ...GenericOptions.headerOptions,
              ...GenericOptions.tabBarOptions,
            }}
          />
        </>
      );
    }
    return undefined;
  };
  const renderPlayerOnlyTabs = () => {
    if (game?.owner !== user?.uid && game?.owner !== undefined) {
      return (
        <>
          <GameTab.Screen
            name="TagScreen"
            children={(props) => (
              <TagCameraScreen tabHeight={Constants.tabHeight} {...props} />
            )} // This is how we pass props to a component
            options={{
              headerShown: false,
              title: "Tag",
              ...GenericOptions.headerOptions,
              ...GenericOptions.tabBarOptions,
            }}
          />
          <GameTab.Screen
            name="TargetScreen"
            component={TargetScreen}
            options={{
              title: "Target",
              ...GenericOptions.headerOptions,
              ...GenericOptions.tabBarOptions,
            }}
          />
        </>
      );
    }
    return undefined;
  };

  const renderScreen = () => {
    if (game?.inProgress === undefined || user?.uid === undefined) {
      return (
        <>
          <GameTab.Screen
            name="LoadingScreen1"
            component={LoadingScreen}
            options={{
              title: "Loading",
              ...GenericOptions.headerOptions,
              ...GenericOptions.tabBarOptions,
            }}
          />
          <GameTab.Screen
            name="LoadingScreen2"
            component={LoadingScreen}
            options={{
              title: "Loading",
              ...GenericOptions.headerOptions,
              ...GenericOptions.tabBarOptions,
            }}
          />
          <GameTab.Screen
            name="LoadingScreen3"
            component={LoadingScreen}
            options={{
              title: "Loading",
              ...GenericOptions.headerOptions,
              ...GenericOptions.tabBarOptions,
            }}
          />
        </>
      );
    }
    return (
      <>
        <GameTab.Screen
          name="FeedScreen"
          component={FeedScreen}
          options={{
            title: "Feed",
            ...GenericOptions.headerOptions,
            ...GenericOptions.tabBarOptions,
          }}
        />
        {renderPlayerOnlyTabs()}
        {renderOwnerOnlyTabs()}
      </>
    );
  };
  return (
    <GameTab.Navigator initialRouteName="FeedScreen" {...props}>
      {renderScreen()}
    </GameTab.Navigator>
  );
};

export const GameTabNavigatorRoot = (props) => {
  const gameId = props.route.params?.gameId;
  return (
    <GameProvider gameId={gameId}>
      <GameTabNavigator {...props} />
    </GameProvider>
  );
  // Tried passing props to GameTabNavigator to fix the problem
};
