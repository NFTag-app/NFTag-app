import { useUser } from "client-sdk";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../screens/LoginScreen";
import { RootStackParamList } from "./NavigationParams";

import { HomeTabNavigator } from "./HomeTabNavigator";
import { GameTabNavigator } from "./GameTabNavigator";
import { OwnedGameTabNavigator } from "./OwnedGameTabNavigator";
import { GenericOptions } from "./Styles";

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const user = useUser();

  return (
    // this is how reactnavigation.org suggests doing login flow
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#25262b" },
      }}
    >
      <RootStack.Navigator initialRouteName="Login">
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
        ) : user?.email ? (
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
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
