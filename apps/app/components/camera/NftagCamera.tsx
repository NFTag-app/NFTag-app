import { useRef, useState, useEffect, useCallback } from "react";

import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Alert,
  AppState,
  LayoutChangeEvent,
  Platform,
} from "react-native";
import { captureRef } from "react-native-view-shot";

import { StatusBar } from "expo-status-bar";

import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";

import { useNavigation, useFocusEffect, ParamListBase } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

import { renderCaptureControls, renderPreviewControls } from "./Overlay";

const DEFAULT_WINDOW_SIZE = Dimensions.get("window");

export const NftagCamera = <TParamList extends ParamListBase, T extends keyof TParamList>({
  type,
  callback,
  screenReady=true,
  overlay,
}) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<TParamList, T>>();

  const cameraRef = useRef<Camera>(null);
  const snapBoxRef = useRef<View>(null);

  const [screenSize, setScreenSize] = useState<{
    width: number;
    height: number;
  }>({ width: DEFAULT_WINDOW_SIZE.width, height: DEFAULT_WINDOW_SIZE.height });

  const [cameraType, setCameraType] = useState(type);
  const [cameraRatio, setCameraRatio] = useState("4:3"); // Default. Only applicable to android
  const [camVertPadding, setCamVertPadding] = useState(0);
  const [camRatioPrepared, setCamRatioPrepared] = useState(false); // mark if the ratio has been prepared, at least initially
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [photoData, setPhotoData] = useState<CameraCapturedPicture | null>(
    null
  );

  const [camPermissions, requestCamPermissions] = Camera.useCameraPermissions();

  const takePicture = async () => {
    if (!cameraRef.current) return;
    const data = await cameraRef.current.takePictureAsync();
    setPhotoData(data);
    cameraRef.current.pausePreview();
  };

  const retakePicture = () => {
    setPhotoData(null);
    if (!cameraRef.current) return;
    cameraRef.current.resumePreview();
  };

  const saveTag = async () => {
    setPhotoData(null);
    if (cameraRef.current) {
      cameraRef.current.resumePreview();
    }
    const result = await captureRef(snapBoxRef, {
      result: "data-uri",
    });

    callback(result);
  };

  const prepareCamRatio = async () => {
    if (Platform.OS === "android" && cameraRef.current) {
      const ratios = await cameraRef.current.getSupportedRatiosAsync();

      let closestRatio: string = "4:3"; // default
      let closestNumRatio: number = 4 / 3; // default
      let closestDistance: number | null = null;
      for (let i = 0; i < ratios.length; ++i) {
        const parts = ratios[i].split(":");
        const numRatio = parseInt(parts[0]) / parseInt(parts[1]);
        const distance = screenSize.height / screenSize.width - numRatio;
        if (closestDistance == null) {
          closestRatio = ratios[i];
          closestNumRatio = numRatio;
          closestDistance = distance;
        } else {
          if (distance > -0.01 && distance < closestDistance) {
            closestRatio = ratios[i];
            closestNumRatio = numRatio;
            closestDistance = distance;
          }
        }
      }
      const remainder = Math.round(
        screenSize.height - closestNumRatio * screenSize.width
      );

      // console.log(screenSize)
      // console.log(closestRatio)
      // console.log(remainder)

      setCamVertPadding(remainder / 2);
      setCameraRatio(closestRatio);
      setCamRatioPrepared(true);
    }
  };

  useEffect(() => {
    requestCamPermissions().then((res) => {
      if (!res.granted) {
        Alert.alert(
          "Permissions Required!",
          "We can only use the camera if you allow it...",
          [
            {
              text: "Ok",
              onPress: () => navigation.goBack(),
            },
          ]
        );
      }
    });
  }, []);

  const updateScreen = async (e: LayoutChangeEvent) => {
    const { width, height } = e.nativeEvent.layout;
    await setScreenSize({ width, height });
    await prepareCamRatio().catch((e) => console.log(e));
  };

  const cameraReady = async () => {
    if (!camRatioPrepared) {
      await prepareCamRatio().catch((e) => console.log(e));
    }
    setIsCameraReady(true);
  };

  const sdStyles = getScreenDependentStyles(screenSize); // Styles depend on screen size

  if (screenReady) {
    return (
      <View style={cameraStyles.mainContainer} onLayout={updateScreen}>
        {camPermissions?.granted && (
          <Camera
            ref={cameraRef}
            style={[
              cameraStyles.camera,
              {
                marginTop: camVertPadding,
                marginBottom: camVertPadding,
                display: photoData ? "none" : "flex",
              },
            ]}
            type={cameraType}
            ratio={cameraRatio}
            onCameraReady={cameraReady}
            onMountError={(err) => {
              console.log("Camera Error: ", err);
            }}
          />
        )}

        {photoData ? (
          <>
            <View
              style={[cameraStyles.container, { backgroundColor: "black", marginTop: camVertPadding, marginBottom: camVertPadding }]}
              ref={snapBoxRef}
            >
              <Image
                source={{ uri: photoData.uri }}
                style={cameraStyles.camera}
              />
            </View>
            {isCameraReady && overlay({ screenSize: screenSize, vertPadding: camVertPadding })}
            {isCameraReady &&
              renderPreviewControls({
                styles: cameraStyles,
                sdStyles,
                saveTag,
                retakePicture,
              })}
          </>
        ) : (
          <>
            {isCameraReady && overlay({ screenSize: screenSize, vertPadding: camVertPadding })}
            {isCameraReady &&
              renderCaptureControls({
                styles: cameraStyles,
                sdStyles,
                takePicture,
                cameraRef,
                isCameraReady,
                navigation,
                screenSize,
              })}
          </>
        )}
        <StatusBar style="auto" hidden />
      </View>
    );
  }
  return undefined;
};

export const cameraStyles = StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
  container: {
    ...StyleSheet.absoluteFillObject,
  },
  camera: {
    ...StyleSheet.absoluteFillObject,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    display: "flex",
    alignItems: "center",
  },
  prevControls: {
    marginTop: "auto",
    paddingBottom: 30,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  captureControls: {
    display: "flex",
    alignItems: "center",
    marginTop: "auto",
  },
});

export const getScreenDependentStyles = (screenSize: {
  width: number;
  height: number;
}) => {
  return StyleSheet.create({
    dot: {
      backgroundColor: "red",
      width: Math.floor(screenSize.width * 0.04),
      height: Math.floor(screenSize.width * 0.04),
      borderRadius: Math.floor(screenSize.width * 0.02),
      marginTop: "auto",
      marginBottom: "auto",
    },
    captureBtn: {
      backgroundColor: "#f5f5f5",
      width: Math.floor(screenSize.width * 0.2),
      height: Math.floor(screenSize.width * 0.2),
      borderRadius: Math.floor(screenSize.width * 0.1),
      margin: Math.floor(screenSize.width * 0.1),
    },
    prevBtn: {
      // backgroundColor: 'red',
      width: Math.floor(screenSize.width / 3),
      paddingVertical: Math.floor(screenSize.width / 12),
      alignItems: "center",
    },
    prevBtnText: {
      fontSize: Math.floor(screenSize.width / 16),
      color: "white",
      marginTop: "auto",
      marginBottom: "auto",
    },
  });
};
