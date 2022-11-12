import { View, StyleSheet } from "react-native"
import { CameraType } from "expo-camera";
import { NftagCamera } from './components/camera/NftagCamera'
import { InGameStackParamList } from "./RootStackParams";
//import { renderBlankOverlay } from "./components/camera/Overlay";

const RegCameraScreen = () => {

	const renderOverlay = ({ screenSize, vertPadding, cameraDetails }) => {
		return undefined
	};

	return (
		<View style={{...StyleSheet.absoluteFillObject}}>
			<NftagCamera<InGameStackParamList, "TagCameraScreen"> type={CameraType.front} callback={(res)=>{console.log(res)}} overlay={renderOverlay}/>
		</View>
	)
}

export default RegCameraScreen