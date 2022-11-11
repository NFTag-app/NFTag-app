import { View, StyleSheet } from "react-native"
import { CameraType } from "expo-camera";
import { NftagCamera } from './components/camera/NftagCamera'
import { renderBlankOverlay, renderTagOverlay } from "./components/camera/Overlay";

const RegCameraScreen = () => {
	return (
		<View style={{...StyleSheet.absoluteFillObject}}>
			<NftagCamera<"RegCamera"> type={CameraType.front} callback={(res)=>{console.log(res)}} overlay={renderBlankOverlay} />
		</View>
	)
}

export default RegCameraScreen