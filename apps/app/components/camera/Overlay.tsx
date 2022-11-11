import { View, TouchableOpacity, Text } from "react-native"

export const renderTagOverlay = ({styles, sdStyles}) => (
<View style={styles.overlay}>
    <View style={sdStyles.dot}/>
</View>
)

export const renderBlankOverlay = ({styles = null, sdStyles = null}) => undefined

export const renderPreviewControls = ({styles, sdStyles, saveTag, retakePicture}) => (
<View style={styles.container}>
    <View style={styles.prevControls}>
    <TouchableOpacity
        style={sdStyles.prevBtn}
        onPress={retakePicture}
    >
        <Text style={sdStyles.prevBtnText}>Retake</Text>
    </TouchableOpacity>
    <TouchableOpacity
        style={sdStyles.prevBtn}
        onPress={saveTag}
    >
        <Text style={sdStyles.prevBtnText}>Save Snap</Text>
    </TouchableOpacity>
    </View>
</View>
)

export const renderCaptureControls = ({styles, sdStyles, takePicture, cameraRef, isCameraReady, navigation, screenSize}) => (
	<View style={styles.captureControls}>
	  <TouchableOpacity
		activeOpacity={0.7}
		disabled={!isCameraReady || !cameraRef.current}
		onPress={takePicture}
		style={sdStyles.captureBtn}
	  />
	  <TouchableOpacity onPress={() => navigation.goBack()} style={{
		position: 'absolute',
		bottom: Math.floor(screenSize.width * 0.1),
		left: 0,
		width: Math.floor(screenSize.width / 3),
		paddingVertical: Math.floor(screenSize.width / 16),
		alignItems: 'center',
	  }}>
		<Text style={{
		  color: 'white',
		  fontSize: Math.floor(screenSize.width / 16),
		}}>Back</Text>
	  </TouchableOpacity>
	  {/* Other capture controls */}
	</View>
  )