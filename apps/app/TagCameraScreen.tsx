import { View, StyleSheet, Text } from "react-native";
import { CameraType } from "expo-camera";
import { NftagCamera } from "./components/camera/NftagCamera";
import {
  getScreenDependentStyles,
  cameraStyles,
} from "./components/camera/NftagCamera";
import { useTarget } from "client-sdk/dist/GameProvider";
import { useEffect, useState } from "react";
import { useInterval } from "./hooks/useInterval";
import moment from "moment";
import Constants from 'expo-constants'
//import { renderTagOverlay } from "./components/camera/Overlay";

const TagCameraScreen = () => {
  const [date, setDate] = useState("");

  useInterval(() => {
    setDate(moment().format("MM-DD-YYYY:x"));
  }, 10);

  const target = useTarget();

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
          {Constants.deviceId}
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
      <NftagCamera<"TagCamera">
        type={CameraType.back}
        callback={(res) => {
          console.log(res);
        }}
        screenReady={!!date}
        overlay={renderOverlay}
      />
    </View>
  );
};

export default TagCameraScreen;
