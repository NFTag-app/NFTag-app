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
} from "client-sdk/dist/GameProvider";
import { useState } from "react";
import { useInterval } from "./hooks/useInterval";
import moment from "moment";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { RootStackParamList } from "./RootStackParams";
import { CommonStyles } from "./styles/CommonStyles";
//import { renderTagOverlay } from "./components/camera/Overlay";

type Props = NativeStackScreenProps<RootStackParamList, "TagCameraScreen">;
const TagCameraScreen = ({ route, navigation: { navigate } }: Props) => {
  const gameId = route.params?.gameId;

  if (!gameId) {
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
    <GameProvider gameId={gameId}>
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        <NftagCamera<"TagCameraScreen">
          type={CameraType.back}
          callback={(res) => {
            console.log(res);
          }}
          screenReady={!!date && !!self}
          overlay={renderOverlay}
        />
      </View>
    </GameProvider>
  );
};

export default TagCameraScreen;
