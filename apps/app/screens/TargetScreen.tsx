import { usePlayer, useTarget } from "client-sdk/dist/GameProvider";
import {
  View,
  ImageBackground,
  useWindowDimensions,
  Image,
  Text,
} from "react-native";
import { CommonStyles } from "../styles/CommonStyles";

const TargetScreen = ({ navigation: { navigate } }) => {
  const dims = useWindowDimensions();
  const target = useTarget();

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
        <Text
          style={{
            color: "white",
            marginBottom: 20,
            fontSize: Math.floor(dims.width / 16),
          }}
        >
          {target.name}
        </Text>
        <View
          style={{
            width: dims.width * 0.8,
            borderRadius: 8,
            margin: "auto",
            backgroundColor: "#25262b",
            justifyContent: "center",
          }}
        >
          <Image
            source={{ uri: target?.image?.uri }}
            style={{
              marginVertical: 50,
              alignSelf: "center",
              width: dims.width * 0.7,
              height: dims.width * 0.7,
              borderRadius: dims.width * 0.25,
            }}
          />
          <Text
            style={{
              alignSelf: "flex-start",
              marginLeft: 20,
              color: "white",
              marginBottom: 20,
              fontSize: Math.floor(dims.width / 16),
            }}
          >
            Kills: {target.tags}
          </Text>
        </View>
      </ImageBackground>
    </View>
  );
};

export default TargetScreen;
