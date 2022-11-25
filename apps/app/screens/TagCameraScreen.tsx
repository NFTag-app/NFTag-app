import { View, Text, Image, StyleSheet } from "react-native";
import { submitTag, useGame, useUser } from "client-sdk";
import { CommonStyles } from "../styles/CommonStyles";
import { OverlayStyles } from "../components/overlay-camera/OverlayStyles";
import { OverlayCamera } from "../components/overlay-camera/OverlayCamera";
import { CameraType } from "expo-camera";
import { useTarget } from "client-sdk/dist/GameProvider";
import { useNavigation } from "@react-navigation/native";
import { GameNavigationProps } from "../RootParams";

const crosshair = require("../assets/Icons/Crosshair/1x/crosshair.png");

export const TagCameraScreen = ({ tabHeight }: { tabHeight: number }) => {
  const gameNavigation = useNavigation<GameNavigationProps>();
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
    console.log("SAVING TAG");
    await submitTag(game, user, target, { uri, width, height });
    // .then(() => {
    //   console.log("HEYYY");
    //   console.log(uri.slice(0, 100), width, height);
    //   gameNavigation.navigate("Feed");
    // })
    // .catch((e) => {
    //   console.log("HEYY");
    //   gameNavigation.navigate("Feed");
    //   console.error(e);
    // });
    await console.log("HEYYY");
    await console.log(uri.slice(0, 100), width, height);
    await gameNavigation.navigate("Feed");
    // NAVIGATION STILL ISN'T WORKING FOR SOME REASON... SOMETHING TO DO WITH submitTag?
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <OverlayCamera
        cameraType={CameraType.back}
        isNft={true}
        nftTitle={target?.name || "Undefined Target Name"}
        saveCallback={saveCallback}
        captureOverlay={captureOverlay}
        preCaptureOverlay={() => undefined}
        bottomInset={tabHeight}
        screenReady={!!game && !!user && !!target}
        backShown={false}
      />
    </View>
  );
};
