import { GoogleSignIn } from "client-sdk";
import { StatusBar } from "expo-status-bar";
import {
  Image,
  ImageBackground,
  useWindowDimensions,
  View,
} from "react-native";
import { CommonStyles } from "../styles/CommonStyles";

export const LoginScreen = () => {
  const dims = useWindowDimensions();

  return (
    <View style={{ ...CommonStyles.container }}>
      <ImageBackground
        source={require("../assets/Icons/1x/loginbg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: dims.width,
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: -50,
            borderRadius: 8,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: dims.width * 0.8,
            height: dims.height * 0.35,
            backgroundColor: "#25262b",
          }}
        >
          <Image
            source={require("../assets/Icons/1x/Logo_Transparent.png")}
            style={{ width: 200, height: 200, marginTop: -20 }}
          />
          <GoogleSignIn />
        </View>
      </ImageBackground>

      <StatusBar style="auto" />
    </View>
  );

  // return (
  //   <View style={CommonStyles.container}>
  //     <Text style={CommonStyles.text}>Welcome</Text>

  //     <Text style={CommonStyles.text}>{user && user.displayName}</Text>

  //     <HomeButton caption="Game List" navigateTo="GameListScreen" />

  //     <TouchableOpacity
  //       style={{
  //         backgroundColor: "#47f",
  //         width: 150,
  //         padding: 10,
  //         margin: 10,
  //         alignItems: "center",
  //       }}
  //       onPress={() => signOut()}
  //     >
  //       <Text style={{ fontSize: 18, color: "#fff" }}>Logout</Text>
  //     </TouchableOpacity>

  //     <StatusBar style="auto" />
  //   </View>
  // );
};
