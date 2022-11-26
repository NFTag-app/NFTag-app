import { useUser } from "client-sdk";

import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";

import { LoginScreen } from "../../screens/LoginScreen";
import { RootStackParamList } from "./NavigationParams";

import { HomeTabNavigator } from "./HomeTabNavigator";
import { GameTabNavigatorRoot } from "./GameTabNavigator";

const RootStack = createStackNavigator<RootStackParamList>();

export const RootStackNavigator = () => {
  const user = useUser();

  if (!user) return <LoginScreen />;

  return (
    <NavigationContainer
      theme={{
        ...DefaultTheme,
        colors: { ...DefaultTheme.colors, background: "#25262b" },
      }}
    >
      <RootStack.Navigator initialRouteName="HomeRoot">
        <RootStack.Screen
          name="HomeRoot"
          component={HomeTabNavigator}
          options={{ headerShown: false }}
        />
        <RootStack.Screen
          name="GameRoot"
          component={GameTabNavigatorRoot}
          options={{ headerShown: false }}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
