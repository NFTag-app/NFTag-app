import { View, Text } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HomeButton } from "./components/buttons/HomeButton";
import { useUser } from "client-sdk";
import { LogoutButton } from "./components/buttons/LogoutButton";
import { LoginButton } from "./components/buttons/LoginButton";
import { UserData } from "client-sdk/dist/types";
import { GameList } from "./components/game-list/GameList"
import { CommonStyles } from "./styles/CommonStyles";

export const HomeScreen = () => {
  const user: UserData = useUser();

  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.text}>Welcome</Text>

      <Text style={CommonStyles.text}>{user && user.displayName}</Text>

      <LoginButton user={user} />

      <HomeButton caption="Reg Camera" navigateTo="RegCamera" />
      <HomeButton caption="Snag Camera" navigateTo="TagCamera" />
      <HomeButton caption="Current Game" navigateTo="InGameScreen" />

      <LogoutButton />

      <GameList/>

      <StatusBar style="auto" />
    </View>
  );
};

