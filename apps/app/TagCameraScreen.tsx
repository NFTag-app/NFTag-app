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
import { InGameStackParamList, RootStackParamList } from "./RootStackParams";
import { CommonStyles } from "./styles/CommonStyles";
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
  const self = usePlayer();
  console.log(self);

  const renderOverlay = ({ screenSize, cameraDetails }) => {
    const sdStyles = getScreenDependentStyles(screenSize);

    return (
      <View style={cameraStyles.overlay}>
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 15,
            top: 20,
            left: 20,
          }}
        >
          {target?.name || "Undefined Target"}
        </Text>
        <Text
          style={{
            position: "absolute",
            color: "white",
            fontSize: 15,
            top: 50,
            left: 20,
          }}
        >
          {self?.id || "Undefined ID"}
        </Text>
        <Text
          style={{
            color: "white",
            fontSize: 10,
            position: "absolute",
            bottom: 15,
            right: 15,
          }}
        >
          {date}
        </Text>
        {/* <View style={{display: 'flex', bottom: '0', alignItems: 'center', justifyContent: 'center'}}>
          
        </View> */}
        <View style={sdStyles.dot} />
      </View>
    );
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <NftagCamera<InGameStackParamList, "TagCameraScreen">
        type={CameraType.back}
        callback={(res) => {
          console.log(res);
        }}
        screenReady={!!date && !!self}
        overlay={renderOverlay}
      />
    </View>
  );
};
