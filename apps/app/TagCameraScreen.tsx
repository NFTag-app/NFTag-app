import { View, StyleSheet, Text } from "react-native";
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
  }, 10);

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

        <View style={sdStyles.dot} />
      </View>
    );
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <NftagCamera<InGameStackParamList, "TagCameraScreen">
        type={CameraType.back}
        callback={(res) => {
          submitTag(game, user, target, res);
        }}
        screenReady={!!date && !!user}
        overlay={renderOverlay}
      />
    </View>
  );
};
