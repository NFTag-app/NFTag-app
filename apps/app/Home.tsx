import { View, Text, LayoutChangeEvent } from "react-native";
import { StatusBar } from "expo-status-bar";
import { HomeButton } from "./components/buttons/HomeButton";
import { useUser } from "client-sdk";
import { LogoutButton } from "./components/buttons/LogoutButton";
import { LoginButton } from "./components/buttons/LoginButton";
import { UserData } from "client-sdk/dist/types";
import { CommonStyles } from "./styles/CommonStyles";
import { GoogleSignIn } from "client-sdk";

export const HomeScreen = () => {
  const user: UserData = useUser();

  if(user) {
    return (
      <View style={CommonStyles.container}>

        <Text style={CommonStyles.text}>NFTag</Text>

        <GoogleSignIn/>
        {/* <LoginButton user={user} /> */}

        <HomeButton caption="Game List" navigateTo="GameListScreen" />

        <LogoutButton />

        <StatusBar style="auto" />
      </View>
    );
  }
  return (
    <View style={CommonStyles.container}>

      <Text style={CommonStyles.text}>Welcome</Text>

      <Text style={CommonStyles.text}>{user && user.displayName}</Text>

      <HomeButton caption="Game List" navigateTo="GameListScreen" />

      <LogoutButton />

      <StatusBar style="auto" />
    </View>
  )
  
};

