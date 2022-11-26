import { ImageBackground, useWindowDimensions } from "react-native";

export const LoadingScreen = () => {
  const dims = useWindowDimensions();

  return (
    <ImageBackground
      source={require("../assets/Icons/1x/loginbg.png")}
      resizeMode="cover"
      style={{
        backgroundColor: "black",
        flex: 1,
        justifyContent: "center",
        width: dims.width,
        alignItems: "center",
      }}
    />
  );
};
