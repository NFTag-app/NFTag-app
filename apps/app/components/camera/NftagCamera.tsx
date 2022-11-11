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
import * as NavigationBar from "expo-navigation-bar";
import { Camera, CameraCapturedPicture, CameraType } from "expo-camera";

import { useNavigation, useFocusEffect } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootStackParamList } from "../../RootStackParams";

import { renderCaptureControls, renderTagOverlay, renderPreviewControls } from "./Overlay";

const DEFAULT_WINDOW_SIZE = Dimensions.get('window')

type CameraScreenProp = NativeStackNavigationProp<RootStackParamList, "Camera">;
export const NftagCamera = ({type, callback, overlay}) => {
  const navigation = useNavigation<CameraScreenProp>();

  const cameraRef = useRef<Camera>(null)
  const snapBoxRef = useRef<View>(null)
  
  const [screenSize, setScreenSize] = useState<{width: number, height: number}>({width: DEFAULT_WINDOW_SIZE.width, height: DEFAULT_WINDOW_SIZE.height})

  const [cameraType, setCameraType] = useState(CameraType.back)
  const [cameraRatio,setCameraRatio] = useState('4:3') // Default. Only applicable to android
  const [camVertPadding, setCamVertPadding] = useState(0)
  const [camRatioPrepared, setCamRatioPrepared] = useState(false) // mark if the ratio has been prepared, at least initially
  const [isCameraReady, setIsCameraReady] = useState(false)
  const [photoData, setPhotoData] = useState<CameraCapturedPicture | null>(null)

  const [camPermissions, requestCamPermissions] = Camera.useCameraPermissions()

  const takePicture = async () => {
    if(!cameraRef.current) return
    const data = await cameraRef.current.takePictureAsync()
    setPhotoData(data)
    cameraRef.current.pausePreview()
  }

  const retakePicture = () => {
    setPhotoData(null)
    if(!cameraRef.current) return
    cameraRef.current.resumePreview()
  }

  const saveTag = async () => {
    setPhotoData(null)
    if(cameraRef.current) {
      cameraRef.current.resumePreview()
    }
    const result = await captureRef(snapBoxRef, {
      result: 'tmpfile'
    })
    console.log(result)
  }

  const prepareCamRatio = async () => {
    if(Platform.OS === 'android' && cameraRef.current) {
      const ratios = await cameraRef.current.getSupportedRatiosAsync()

      let closestRatio: string = '4:3' // default
      let closestNumRatio: number = 4/3 // default
      let closestDistance: number | null = null
      for (let i = 0; i < ratios.length; ++i) {
        const parts = ratios[i].split(':')
        const numRatio = parseInt(parts[0]) / parseInt(parts[1])
        const distance = (screenSize.height / screenSize.width) - numRatio
        if(closestDistance == null) {
          closestRatio = ratios[i]
          closestNumRatio = numRatio
          closestDistance = distance
        } else {
          console.log(distance)
          if ((distance > -0.01) && distance < closestDistance) {
            closestRatio = ratios[i]
            closestNumRatio = numRatio
            closestDistance = distance
          }
        }
      }
      const remainder = Math.round(
        (screenSize.height - closestNumRatio * screenSize.width)
      )

      // console.log(screenSize)
      // console.log(closestRatio)
      // console.log(remainder)

      setCamVertPadding(remainder / 2)
      setCameraRatio(closestRatio)
      setCamRatioPrepared(true)
    }
  }

  const setNavigationBar = () => {
    if(!(Platform.OS==='android')) return
    NavigationBar.setBehaviorAsync('overlay-swipe')
    NavigationBar.setVisibilityAsync('hidden')
  }
  const setDefaultNavigationBar = () => {
    if(!(Platform.OS==='android')) return
    NavigationBar.setBehaviorAsync('inset-touch')
    NavigationBar.setVisibilityAsync('visible')
  }

  useFocusEffect(
	useCallback(() => {
		setNavigationBar()
		return () => {
			setDefaultNavigationBar()
		}
	}, [])
  )

  useEffect(() => {
	const ascSubscription = AppState.addEventListener('change', nextAppState => {
	  // When user comes back into the app set the correct nav bar behavior
	  if(nextAppState === 'active') {
		setNavigationBar()
	  }
	})

	requestCamPermissions().then(res => {
		if(!res.granted) {
		Alert.alert('Permissions Required!', 'We can only use the camera if you allow it...', [
			{
				text: 'Ok',
				onPress: () => navigation.goBack()
			}
		])
	  }
	})

	return () => {
	  ascSubscription.remove()
	}
  }, [])

  const updateScreen = async (e: LayoutChangeEvent) => {
    const {width, height} = e.nativeEvent.layout
    setScreenSize({width, height})
    prepareCamRatio()
    if(Platform.OS==='android') {
      const behavior= await NavigationBar.getBehaviorAsync()
      if(behavior!=='overlay-swipe') setNavigationBar()
    }
  }

  const cameraReady = async () => {
    if(!camRatioPrepared) {
      await prepareCamRatio()
    }
    setIsCameraReady(true)
  }

  const getScreenDependentStyles = (screenSize: {width: number, height: number}) => { 
    return StyleSheet.create({
      dot: {
        backgroundColor: 'red',
        width: Math.floor(screenSize.width * 0.04),
        height: Math.floor(screenSize.width * 0.04),
        borderRadius: Math.floor(screenSize.width * 0.02),
        marginTop: 'auto',
        marginBottom: 'auto',
      },
      captureBtn: {
        backgroundColor: '#f5f5f5',
        width: Math.floor(screenSize.width * 0.2),
        height: Math.floor(screenSize.width * 0.2),
        borderRadius: Math.floor(screenSize.width * 0.1),
        margin: Math.floor(screenSize.width * 0.1),
      },
      prevBtn: {
        // backgroundColor: 'red',
        width: Math.floor(screenSize.width / 3),
        paddingVertical: Math.floor(screenSize.width / 12),
        alignItems: 'center',
      },
      prevBtnText: {
        fontSize: Math.floor(screenSize.width / 16),
        color: 'white',
        marginTop: 'auto',
        marginBottom: 'auto',
      }
    })
  }
  const sdStyles = getScreenDependentStyles(screenSize) // Styles depend on screen size

  return (
	<View style={styles.mainContainer} onLayout={updateScreen}>
		{ camPermissions?.granted && 
		<Camera
		  ref={cameraRef}
		  style={[styles.camera, {marginTop: camVertPadding, marginBottom: camVertPadding, display: photoData ? 'none' : 'flex'}]}
		  type={cameraType}
		  ratio={cameraRatio}
		  onCameraReady={cameraReady}
		  onMountError={err => {
			console.log('Camera Error: ', err)
		  }}
		/>
	  }
	  
	  {
		photoData ? <>
		  <View style={[styles.container, {backgroundColor: 'black'}]} ref={snapBoxRef}>
			<Image source={{ uri: photoData.uri }} style={[styles.camera, {marginTop: camVertPadding, marginBottom: camVertPadding}]}/>
		  </View>
		  {renderTagOverlay({styles, sdStyles})}
		  {renderPreviewControls({styles, sdStyles, saveTag, retakePicture})}
		</> :
		<>
		  {isCameraReady && renderTagOverlay({styles, sdStyles})}
		  {renderCaptureControls({styles, sdStyles, takePicture, cameraRef, isCameraReady, navigation, screenSize})}
		</>
	  }
	  <StatusBar style="auto" hidden/>
	</View>
  )
};

const styles = StyleSheet.create({
	mainContainer: {
	...StyleSheet.absoluteFillObject,
	backgroundColor: 'black',
  },
  container: {
	...StyleSheet.absoluteFillObject,
  },
  camera: {
	...StyleSheet.absoluteFillObject,
  },
  overlay: {
	...StyleSheet.absoluteFillObject,
	display: 'flex',
	alignItems: 'center',
  },
  prevControls: {
	marginTop: 'auto',
	paddingBottom: 30,
	display: 'flex',
	flexDirection: 'row',
	justifyContent: 'space-evenly',
  },
  captureControls: {
	display: 'flex',
	alignItems: 'center',
	marginTop: 'auto',
  },
})
