import { ImageBackground, useWindowDimensions, Text } from "react-native";

export const LoadingScreen = () => {
  const dims = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../assets/Icons/1x/loginbg.png")}
      resizeMode="cover"
      style={{
        backgroundColor: "#25262b",
        flex: 1,
        width: dims.width,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ color: "white", fontSize: 24 }}>Loading...</Text>
    </ImageBackground>
  );
};
