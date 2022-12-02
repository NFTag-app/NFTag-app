import { useUser } from "client-sdk";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../screens/LoginScreen";
import { RootStackParamList } from "./NavigationParams";

import { HomeTabNavigator } from "./HomeTabNavigator";
import { GameTabNavigator } from "./GameTabNavigator";
import { OwnedGameTabNavigator } from "./OwnedGameTabNavigator";
import { GenericOptions } from "./Styles";
import { LoadingScreen } from "../../screens/LoadingScreen";
import { useState } from "react";

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const user = useUser();

  const RenderStackScreens = () => {
    if (user.currentGame) {
      return (
        <RootStack.Screen
          name="GameRoot"
          component={GameTabNavigator}
          options={{ headerShown: false }}
        />
      );
    }
    return undefined;
  };

  if (!user?.uid) {
    return <LoginScreen />;
  }

  // if (user?.uid && !user?.loggedIn) {
  //   return <LoadingScreen text="Yelling at the server..." />; // Could have just said "loading" but this seems cooler?
  // }

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#25262b" },
      }}
    >
      <RootStack.Navigator initialRouteName="Login">
        {/* {user?.currentGame ? (
          <RootStack.Screen
            name="GameRoot"
            component={GameTabNavigator}
            options={{ headerShown: false }}
          />
        ) : user?.ownedGame ? (
          <RootStack.Screen
            name="OwnedGameRoot"
            component={OwnedGameTabNavigator}
            options={{ headerShown: false }}
          />
        ) : user?.uid ? (
          <RootStack.Screen
            name="HomeRoot"
            component={HomeTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <RootStack.Screen
            name="Login"
            component={LoginScreen}
            options={{
              title: "Sign in",
              ...GenericOptions.headerOptions,
              ...GenericOptions.tabBarOptions,
            }}
          />
        )} */}
        {user?.currentGame ? (
          <RootStack.Screen
            name="GameRoot"
            component={GameTabNavigator}
            options={{ headerShown: false }}
          />
        ) : user?.ownedGame ? (
          <RootStack.Screen
            name="OwnedGameRoot"
            component={OwnedGameTabNavigator}
            options={{ headerShown: false }}
          />
        ) : (
          <RootStack.Screen
            name="HomeRoot"
            component={HomeTabNavigator}
            options={{ headerShown: false }}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
