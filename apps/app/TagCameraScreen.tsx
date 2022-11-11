import { View, StyleSheet } from "react-native"
import { CameraType } from "expo-camera";
import { NftagCamera } from './components/camera/NftagCamera'
import { renderTagOverlay } from "./components/camera/Overlay";

const TagCameraScreen = () => {
	return (
		<View style={{...StyleSheet.absoluteFillObject}}>
			<NftagCamera type={CameraType.back} callback={()=>{}} overlay={renderTagOverlay} />
		</View>
	)
}

export default TagCameraScreen