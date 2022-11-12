import { View, StyleSheet } from "react-native"
import { CameraType } from "expo-camera";
import { NftagCamera } from './components/camera/NftagCamera'
import { InGameStackParamList, RootStackParamList } from "./RootStackParams";
import { joinGame, useUser } from "client-sdk";
import { UserData } from "client-sdk/dist/types";
import { useState } from "react";
//import { renderBlankOverlay } from "./components/camera/Overlay";

const JoinGameScreen = () => {
  const user: UserData = useUser();

  const [gameId, setGameId] = useState('')

	const renderOverlay = ({ screenSize, vertPadding, cameraDetails }) => {
		return undefined
	};

	return (
		<View style={{...StyleSheet.absoluteFillObject}}>
			<NftagCamera<RootStackParamList, "JoinGameScreen"> type={CameraType.front} callback={image => joinGame(gameId, user, image)} overlay={renderOverlay}/>
		</View>
	)
}

export default JoinGameScreen