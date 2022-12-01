import { ImageBackground, useWindowDimensions, Text } from "react-native";

export const LoadingScreen = ({ text = 'Loading...' }: { text?: string }) => {
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
      <Text style={{ alignSelf: 'center', textAlign: 'center', width: '90%', color: "white", fontSize: 24 }}>{text}</Text>
    </ImageBackground>
  );
};
