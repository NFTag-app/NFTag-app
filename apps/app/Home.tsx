import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HomeButton } from "./components/buttons/HomeButton";
import { GoogleSignIn, useUser } from "client-sdk";
import { LogoutButton } from "./components/buttons/LogoutButton";
import { LoginButton } from "./components/buttons/LoginButton";
import { UserData } from "client-sdk/dist/types";
import { GameList } from "./components/game-list/GameList"

const HomeScreen = () => {
  const user: UserData = useUser();

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>

      <Text style={styles.welcome}>{user && user.displayName}</Text>

      <LoginButton user={user} />

      <HomeButton caption="Reg Camera" navigateTo="RegCamera" />
      <HomeButton caption="Snag Camera" navigateTo="TagCamera" />
      
      <LogoutButton />

      <GameList/>

      <StatusBar style="auto" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  welcome: { color: "#333", fontSize: 20 },
});

export default HomeScreen;
