import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  StyleSheet,
  Alert,
  Image,
  Platform,
  useWindowDimensions,
} from "react-native";
import { StatusBar } from "expo-status-bar";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { NftOverlay } from "./NftOverlay";
import { PreviewControls } from "./PreviewControls";
import { CaptureControls } from "./CaptureControls";
import { captureRef } from "react-native-view-shot";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export const OverlayCamera = <
  TParamList extends ParamListBase,
  T extends keyof TParamList
>({
  cameraType,
  isNft,
  nftTitle,
  saveCallback,
  captureOverlay,
  preCaptureOverlay,
  screenReady,
}: {
  cameraType: CameraType;
  isNft: boolean;
  nftTitle: string | undefined;
  saveCallback: (uri: string, width: number, height: number) => void;
  captureOverlay: (vertMargin: number) => JSX.Element | undefined;
  preCaptureOverlay: (vertMargin: number) => JSX.Element | undefined;
  screenReady: boolean;
}) => {
  const navigation = useNavigation<NativeStackNavigationProp<TParamList, T>>();
  const [camPermissions, requestCamPermissions] = Camera.useCameraPermissions();

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

  const camRef = useRef<Camera>(null);
  const snapBoxRef = useRef<View>(null);
  const [camIsReady, setCamIsReady] = useState<boolean>(false);
  const [vertMargin, setVertMargin] = useState<number>(0);
  const [camRatio, setCamRatio] = useState<string>("4:3");
  const [camRatioPrepared, setCamRatioPrepared] = useState<boolean>(false);
  const [photoData, setPhotoData] = useState<CameraCapturedPicture | null>(
    null
  );
  const [nftOverlayReady, setNftOverlayReady] = useState<boolean>(false);

  const cameraReady = async () => {
    if (!camRatioPrepared) {
      await prepareCamRatio().catch((e) => console.log(e));
    }
    setCamIsReady(true);
  };

  const dims = useWindowDimensions();
  const prepareCamRatio = async () => {
    if (Platform.OS === "android" && camRef.current) {
      const supportedRatios: string[] =
        await camRef.current.getSupportedRatiosAsync();
      let closestRatio: string = "4:3";
      let closestNumRatio: number = 4 / 3;
      let closestDistance: number | undefined = undefined;
      for (let i = 0; i < supportedRatios.length; ++i) {
        const parts = supportedRatios[i].split(":");
        const numRatio = parseInt(parts[0]) / parseInt(parts[1]);
        const distance = dims.height / dims.width - numRatio;
        if (closestDistance === undefined) {
          closestRatio = supportedRatios[i];
          closestNumRatio = numRatio;
          closestDistance = distance;
        } else if (distance > 0 && distance < closestDistance) {
          closestRatio = supportedRatios[i];
          closestNumRatio = numRatio;
          closestDistance = distance;
        }
      }
      const remainder = dims.height - closestNumRatio * dims.width;

      setVertMargin(remainder / 2);
      setCamRatio(closestRatio);
      setCamRatioPrepared(true);
    }
  };

  const takePicture = async () => {
    if (!camRef.current) return;
    const data = await camRef.current.takePictureAsync();
    await setPhotoData(data);
    camRef.current.pausePreview();
  };
  const save = async () => {
    if (snapBoxRef.current && photoData) {
      const capUri = await captureRef(snapBoxRef, {
        result: "data-uri",
      });
      const scaledRes = await manipulateAsync(
        capUri,
        [
          {
            resize: {
              width: photoData.width / 4,
              height: photoData.height / 4,
            },
          },
        ],
        { format: SaveFormat.PNG, base64: true }
      );
      if (camRef.current) {
        await camRef.current.resumePreview();
      }
      await setPhotoData(null);
      await saveCallback(
        "data:image/png;base64," + scaledRes.base64,
        scaledRes.width,
        scaledRes.height
      );
    }
  };
  const retake = async () => {
    if (camRef.current) {
      await camRef.current.resumePreview();
    }
    setPhotoData(null);
  };

  const renderCamera = () => {
    if (camPermissions?.granted) {
      return (
        <Camera
          ref={camRef}
          style={{
            ...StyleSheet.absoluteFillObject,
            marginTop: vertMargin,
            marginBottom: vertMargin,
          }}
          type={cameraType}
          ratio={camRatio}
          onCameraReady={cameraReady}
          onMountError={(e) => console.log(e)}
        />
      );
    }
    return undefined;
  };
  const renderNftOverlay = () => {
    if (isNft) {
      return (
        <NftOverlay
          setReady={setNftOverlayReady}
          isUpdating={!photoData}
          title={nftTitle}
          vertMargin={vertMargin}
        />
      );
    }
    return undefined;
  };
  const renderCapturedImage = () => {
    if (photoData) {
      return (
        <Image
          source={{ uri: photoData.uri }}
          style={{
            ...StyleSheet.absoluteFillObject,
            marginTop: vertMargin,
            marginBottom: vertMargin,
          }}
        />
      );
    }
    return undefined;
  };
  const renderCaptureOverlay = () => {
    if (camIsReady) {
      return captureOverlay(vertMargin);
    }
    return undefined;
  };
  const renderPreCaptureOverlay = () => {
    if (camIsReady && !photoData) {
      return preCaptureOverlay(vertMargin);
    }
    return undefined;
  };
  const renderPreviewControls = () => {
    if (photoData) {
      return <PreviewControls onSave={save} onRetake={retake} />;
    }
    return undefined;
  };
  const renderCaptureControls = () => {
    if (camIsReady && !photoData && (nftOverlayReady || !isNft)) {
      return (
        <CaptureControls
          onTakePicture={takePicture}
          onGoBack={() => navigation.goBack()}
        />
      );
    }
    return undefined;
  };

  if (screenReady) {
    return (
      <View style={cameraStyles.mainContainer}>
        {renderCamera()}
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: photoData ? "black" : "transparent",
          }}
          ref={snapBoxRef}
        >
          {renderCapturedImage()}
          {renderCaptureOverlay()}
          {renderNftOverlay()}
        </View>
        {renderPreCaptureOverlay()}
        {renderPreviewControls()}
        {renderCaptureControls()}
        <StatusBar style="auto" hidden />
      </View>
    );
  }
  return null;
};

const cameraStyles = StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "black",
  },
});
