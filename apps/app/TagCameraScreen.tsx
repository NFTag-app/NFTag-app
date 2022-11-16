import { View, Text, Image, StyleSheet } from "react-native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { submitTag, useGame, useUser } from "client-sdk";
import { InGameStackParamList } from "./RootStackParams";
import { CommonStyles } from "./styles/CommonStyles";
import { OverlayStyles } from "./components/overlay-camera/OverlayStyles";
import { OverlayCamera } from "./components/overlay-camera/OverlayCamera";
import { CameraType } from "expo-camera";
import { useTarget } from "client-sdk/dist/GameProvider";
import { useNavigation } from "@react-navigation/native";

const crosshair = require("./assets/Icons/Crosshair/1x/crosshair.png");

export const TagCameraScreen = () => {
  // const navigation =
  //   useNavigation<
  //     NativeStackNavigationProp<InGameStackParamList, "TagCameraScreen">
  //   >(); can't get navigation to work :(
  const game = useGame();
  const user = useUser();
  const target = useTarget();

  if (!game.id) {
    return (
      <View style={CommonStyles.container}>
        <Text style={{ color: "white", fontSize: 20 }}>MISSING GAME ID</Text>
      </View>
    );
  }

  const captureOverlay = () => {
    return (
      <View style={OverlayStyles.wrapper}>
        <View style={OverlayStyles.flexContainer}>
          <Image
            style={{
              width: 64,
              height: 64,
              marginTop: "auto",
              marginBottom: "auto",
            }}
            resizeMode="cover"
            source={crosshair}
          />
        </View>
      </View>
    );
  };

  const saveCallback = async (uri: string, width: number, height: number) => {
    await submitTag(game, user, target, { uri, width, height }).catch((e) =>
      console.log(e)
    );
    await console.log(uri.slice(0, 100), width, height);
    //await navigation.navigate("InGameScreen"); CAN'T GET NAVIGATION TO WORK :(
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <OverlayCamera<InGameStackParamList, "TagCameraScreen">
        cameraType={CameraType.back}
        isNft={true}
        nftTitle={target?.name || "Undefined Target Name"}
        saveCallback={saveCallback}
        captureOverlay={captureOverlay}
        preCaptureOverlay={() => undefined}
        screenReady={!!game && !!user && !!target}
      />
    </View>
  );
};
