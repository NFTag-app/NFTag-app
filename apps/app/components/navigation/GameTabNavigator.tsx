import { GameProvider, useUser } from "client-sdk";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { FeedScreen } from "../../screens/game/FeedScreen";
import { TagCameraScreen } from "../../screens/game/TagCameraScreen";
import { TargetScreen } from "../../screens/game/TargetScreen";

import { Constants, ComponentStyles, GenericOptions } from "./Styles";
import { GameTabParamList } from "./NavigationParams";
import { LoadingScreen } from "../../screens/LoadingScreen";
import { SettingsScreen } from "../../screens/SettingsScreen";
import IonIcons from "@expo/vector-icons/Ionicons";

const GameTab = createBottomTabNavigator<GameTabParamList>();

export const GameTabNavigator = () => {
  const user = useUser();

  // const renderOwnerOnlyTabs = () => {
  //   const renderOwnerOnlyPreStart = () => {
  //     console.log('GameTabNavigator.renderOnlyPreStart.gameInProgress?', !game?.inProgress);
  //     if (!game?.inProgress) {
  //       return (
  //         <GameTab.Screen
  //           name="ShareGameScreen"
  //           children={(props) => (
  //             <ShareGameScreen gameId={user.currentGame} {...props} />
  //           )}
  //           options={{
  //             title: "Share Game",
  //             ...GenericOptions.headerOptions,
  //             ...GenericOptions.tabBarOptions,
  //           }}
  //         />
  //       );
  //     }
  //     return undefined;
  //   };
  //   if (game?.owner === user?.uid && game?.owner !== undefined) {
  //     return (
  //       <>
  //         {renderOwnerOnlyPreStart()}
  //         <GameTab.Screen
  //           name="GameSettingsScreen"
  //           component={GameSettingsScreen}
  //           options={{
  //             title: "Settings",
  //             ...GenericOptions.headerOptions,
  //             ...GenericOptions.tabBarOptions,
  //           }}
  //         />
  //       </>
  //     );
  //   }
  //   return undefined;
  // };

  return (
    <GameProvider gameId={user?.currentGame}>
      <GameTab.Navigator initialRouteName="FeedScreen">
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
          name="TagScreen"
          children={(props) => (
            <TagCameraScreen tabHeight={Constants.tabHeight} {...props} />
          )} // This is how we pass props to a component
          options={{
            headerShown: false,
            title: "Tag",
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
        <GameTab.Screen
          name="TargetScreen"
          component={TargetScreen}
          options={{
            title: "Target",
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
                <IonIcons name="information-circle" size={size} color={color} />
              );
            },
            ...GenericOptions.headerOptions,
            ...GenericOptions.tabBarOptions,
          }}
        />
        <GameTab.Screen
          name="SettingsScreen"
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
        {/* {renderOwnerOnlyTabs()} */}
      </GameTab.Navigator>
    </GameProvider>
  );
};
