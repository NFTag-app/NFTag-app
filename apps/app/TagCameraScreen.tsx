import { View, StyleSheet, Text, Image } from "react-native";
import { CameraType } from "expo-camera";
import { NftagCamera } from "./components/camera/NftagCamera";
import {
  getScreenDependentStyles,
  cameraStyles,
} from "./components/camera/NftagCamera";
import GameProvider, {
  useTarget,
  usePlayer,
  useGame,
} from "client-sdk/dist/GameProvider";
import { useState } from "react";
import { useInterval } from "./hooks/useInterval";
import moment from "moment";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { InGameStackParamList } from "./RootStackParams";
import { CommonStyles } from "./styles/CommonStyles";
import { submitTag, useUser } from "client-sdk";
//import { renderTagOverlay } from "./components/camera/Overlay";

const logo = require("./assets/Icons/1x/Logo_Transparent.png");
const crosshair = require("./assets/Icons/Crosshair/1x/crosshair.png")

type Props = NativeStackScreenProps<InGameStackParamList, "TagCameraScreen">;
export const TagCameraScreen = ({ navigation: { navigate } }) => {
  const game = useGame();

  if (!game.id) {
    return (
      <View style={CommonStyles.container}>
        <Text>MISSING GAME ID</Text>
      </View>
    );
  }

  const [date, setDate] = useState("");

  useInterval(() => {
    setDate(moment().format("MM-DD-YYYY:x"));
  }, 73);

  const target = useTarget();
  const user = useUser();

  const renderOverlay = ({ screenSize, vertPadding }) => {
    const sdStyles = getScreenDependentStyles(screenSize);

    return (
      <View style={cameraStyles.overlay}>
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 15,
            top: 20 + vertPadding,
            right: 20,
          }}
        >
          {target?.name || "Undefined Target"}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 15,
            position: "absolute",
            top: 50 + vertPadding,
            right: 20,
          }}
        >
          {date}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 15,
            top: 80 + vertPadding,
            right: 20,
          }}
        >
          {user?.uid || "Undefined ID"}
        </Text>
        <Image
          style={{
            position: "absolute",
            left: 14,
            top: 13 + vertPadding,
            width: 100,
            height: 50,
          }}
          resizeMode="cover"
          source={logo}
        />

        <Image
          style={{
            width: 64,
            height: 64,
            marginTop: 'auto',
            marginBottom: 'auto',
          }}
          resizeMode="cover"
          source={crosshair}
        />

        {/* <View style={sdStyles.dot} /> */}
      </View>
    );
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <NftagCamera<InGameStackParamList, "TagCameraScreen">
        type={CameraType.back}
        callback={(res) => {
          submitTag(game, user, target, res).catch((e) => console.log(e));
        }}
        screenReady={!!date && !!user}
        overlay={renderOverlay}
      />
    </View>
  );
};
