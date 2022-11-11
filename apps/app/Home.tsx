import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HomeButton } from "./components/buttons/HomeButton";
import { GoogleSignIn, useUser } from "client-sdk";
import { LogoutButton } from "./components/buttons/LogoutButton";

const HomeScreen = () => {
  const user = useUser();

  const login = user === null ? <GoogleSignIn /> : undefined;

  return (
    <View style={styles.container}>
      <Text style={styles.welcome}>Welcome</Text>

      <Text style={styles.welcome}>{user && user.displayName}</Text>
      {login}

      <HomeButton caption="Reg Camera" navigateTo="RegCamera" />
      <HomeButton caption="Snag Camera" navigateTo="TagCamera" />
      
      <LogoutButton />

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
