import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  Platform,
  useWindowDimensions,
} from "react-native";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";
import { useEffect, useRef, useState } from "react";
import { NftOverlay } from "./NftOverlay";
import { PreviewControls } from "./PreviewControls";
import { CaptureControls } from "./CaptureControls";
import { captureRef } from "react-native-view-shot";
import { manipulateAsync, SaveFormat } from "expo-image-manipulator";

export const OverlayCamera = ({
  cameraType,
  isNft,
  nftTitle,
  saveCallback,
  captureOverlay,
  preCaptureOverlay,
  bottomInset,
  screenReady,
  backShown,
}: {
  cameraType: CameraType;
  isNft: boolean;
  nftTitle: string | undefined;
  saveCallback: (uri: string, width: number, height: number) => void;
  captureOverlay: (
    topMargin: number,
    bottomMargin: number
  ) => JSX.Element | undefined;
  preCaptureOverlay: (
    topMargin: number,
    bottomMargin: number
  ) => JSX.Element | undefined;
  bottomInset: number;
  screenReady: boolean;
  backShown: boolean;
}) => {
  const navigation = useNavigation();
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

  const [screenIsFocused, setScreenIsFocused] = useState(false);
  const camRef = useRef<Camera>(null);
  const snapBoxRef = useRef<View>(null);
  const [camIsReady, setCamIsReady] = useState<boolean>(false);
  const [topMargin, setTopMargin] = useState<number>(0);
  const [bottomMargin, setBottomMargin] = useState<number>(0);
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

  useEffect(() => {
    navigation.addListener("focus", () => {
      setScreenIsFocused(true);
      //console.log("hello");
      //console.log(camRatio);
    });
    navigation.addListener("blur", () => {
      setScreenIsFocused(false);
      //console.log("leave");
      setCamIsReady(false);
      //console.log(camRatio);
    });
  }, []);

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
        const distance = (dims.height - bottomInset) / dims.width - numRatio;
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
      const remainder =
        dims.height - bottomInset - closestNumRatio * dims.width;

      setTopMargin(remainder / 2);
      setBottomMargin(remainder / 2);
      setCamRatio(closestRatio);
      setCamRatioPrepared(true);
    }
  };

  const takePicture = async () => {
    if (!camRef.current) return;
    const data = await camRef.current.takePictureAsync();
    await setPhotoData(data);
    // camRef.current.pausePreview();
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
      // if (camRef.current) {
      //   await camRef.current.resumePreview();
      // }
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

  const loadingScreen = (
    <View
      style={{
        ...StyleSheet.absoluteFillObject,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#25262b",
      }}
    >
      <Text style={{ color: "white", fontSize: 24 }}>Loading Camera...</Text>
    </View>
  );
  const renderCamera = () => {
    if (camPermissions?.granted && !photoData) {
      return (
        <Camera
          ref={camRef}
          style={{
            ...StyleSheet.absoluteFillObject,
            marginTop: topMargin,
            marginBottom: bottomMargin,
          }}
          type={cameraType}
          ratio={camRatio}
          onCameraReady={cameraReady}
          onMountError={(e) => console.log(e)}
        />
      );
    }
    return loadingScreen;
  };
  const renderNftOverlay = () => {
    if (isNft) {
      return (
        <NftOverlay
          setReady={setNftOverlayReady}
          isUpdating={!photoData}
          title={nftTitle}
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
          }}
        />
      );
    }
    return undefined;
  };
  const renderCaptureOverlay = () => {
    return captureOverlay(topMargin, bottomMargin);
  };
  const renderPreCaptureOverlay = () => {
    if (!photoData) {
      return preCaptureOverlay(topMargin, bottomMargin);
    }
    return undefined;
  };
  const renderPreviewControls = () => {
    if (photoData) {
      return (
        <PreviewControls
          onSave={save}
          onRetake={retake}
          bottomInset={bottomInset}
        />
      );
    }
    return undefined;
  };
  const renderCaptureControls = () => {
    if (!photoData && (nftOverlayReady || !isNft)) {
      return (
        <CaptureControls
          onTakePicture={takePicture}
          onGoBack={() => navigation.goBack()}
          bottomInset={bottomInset}
          backShown={backShown}
        />
      );
    }
    return undefined;
  };

  const renderOverlays = () => {
    if (camIsReady) {
      return (
        <View
          style={{
            ...StyleSheet.absoluteFillObject,
            backgroundColor: photoData ? "#25262b" : "transparent",
          }}
        >
          <View
            style={{
              ...StyleSheet.absoluteFillObject,
              top: topMargin,
              bottom: bottomMargin,
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
        </View>
      );
    }
    return loadingScreen;
  };

  if (screenReady && screenIsFocused) {
    return (
      <View style={cameraStyles.mainContainer}>
        {renderCamera()}
        {renderOverlays()}
      </View>
    );
  }
  return loadingScreen;
};

const cameraStyles = StyleSheet.create({
  mainContainer: {
    ...StyleSheet.absoluteFillObject,
    //backgroundColor: "#25262b",
    backgroundColor: "#25262b",
  },
});
