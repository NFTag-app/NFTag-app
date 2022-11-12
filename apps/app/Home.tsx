import { View, Text, LayoutChangeEvent, TouchableOpacity } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HomeButton } from "./components/buttons/HomeButton";
import { signOut, useUser } from "client-sdk";
import { LogoutButton } from "./components/buttons/LogoutButton";
import { LoginButton } from "./components/buttons/LoginButton";
import { UserData } from "client-sdk/dist/types";
import { CommonStyles } from "./styles/CommonStyles";
import { GoogleSignIn } from "client-sdk";

export const HomeScreen = () => {
  const user: UserData = useUser();

  if (!user) {
    return (
      <View style={CommonStyles.container}>
        <Text style={CommonStyles.text}>NFTag</Text>

        <GoogleSignIn />

        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <View style={CommonStyles.container}>
      <Text style={CommonStyles.text}>Welcome</Text>

      <Text style={CommonStyles.text}>{user && user.displayName}</Text>

      <HomeButton caption="Game List" navigateTo="GameListScreen" />

      <HomeButton caption="Join Game" navigateTo="JoinGameScreen" />

      <TouchableOpacity
        style={{
          backgroundColor: "#47f",
          width: 150,
          padding: 10,
          margin: 10,
          alignItems: "center",
        }}
        onPress={() => signOut()}
      >
        <Text style={{ fontSize: 18, color: "#fff" }}>Logout</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
  return undefined;
};
