import { View, StyleSheet } from "react-native"
import { CameraType } from "expo-camera";
import { NftagCamera } from './components/camera/NftagCamera'
//import { renderBlankOverlay } from "./components/camera/Overlay";

const RegCameraScreen = () => {

	const renderOverlay = ({ screenSize, cameraDetails }) => {
		return undefined
	};

	return (
		<View style={{...StyleSheet.absoluteFillObject}}>
			<NftagCamera<"RegCamera"> type={CameraType.front} callback={(res)=>{console.log(res)}} overlay={renderOverlay} />
		</View>
	)
}

export default RegCameraScreen