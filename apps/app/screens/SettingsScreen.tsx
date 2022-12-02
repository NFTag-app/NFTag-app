import { useNavigation } from "@react-navigation/native";
import { signOut, useUser } from "client-sdk";
import {
  TouchableOpacity,
  Text,
  useWindowDimensions,
  ImageBackground,
  StyleSheet,
} from "react-native";
//import { RootNavigationProps } from "../components/navigation/NavigationParams";

export const SettingsScreen = () => {
  const dims = useWindowDimensions();
  const user = useUser();
  //const rootNavigation = useNavigation<RootNavigationProps>();

  const _logOut = async () => {
    try {
      await signOut();
      //rootNavigation.navigate("Login");
    } catch (ex) {
      console.log("GameListScreen.fab.signOut.error", ex);
      alert(`Oops! That didn't work! Try again(?)!`);
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Icons/1x/loginbg.png")}
      resizeMode="cover"
      style={{ ...styles.background, width: dims.width }}
    >
      <TouchableOpacity
        onPress={_logOut}
        style={{
          backgroundColor: "#4a368a",
          paddingVertical: 15,
          width: dims.width * 0.8,
          borderRadius: 20,
        }}
      >
        <Text
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            color: "white",
            fontSize: Math.floor(dims.width / 16),
          }}
        >
          Log out
        </Text>
      </TouchableOpacity>
    </ImageBackground>
  );
};

// Log out and stuff

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
