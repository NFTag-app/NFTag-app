import { View, Text, TextInput, StyleSheet } from "react-native";
import { CameraType } from "expo-camera";
import { cameraStyles, NftagCamera } from "./components/camera/NftagCamera";
import { InGameStackParamList, RootStackParamList } from "./RootStackParams";
import { joinGame, useUser } from "client-sdk";
import { UserData } from "client-sdk/dist/types";
import { useState } from "react";
//import { renderBlankOverlay } from "./components/camera/Overlay";

const JoinGameScreen = ({navigation: {navigate}}) => {
  const user: UserData = useUser();

  const [gameId, setGameId] = useState('');

  const renderOverlay = ({ screenSize, vertPadding, cameraDetails }) => {
    return (
      <View style={cameraStyles.overlay}>
        <View
          style={{
            alignItems: "center",
            marginTop: screenSize.height / 6,
          }}
        >
          <Text
            style={{
              color: "white",
              marginBottom: 10,
              fontSize: Math.floor(screenSize.width / 16),
            }}
          >
            Game Code
          </Text>
          <TextInput
            keyboardType="numeric"
            maxLength={6}
            autoCapitalize="characters"
            placeholderTextColor={"#FFFFFF88"}
            style={{
              textAlign: "center",
              fontSize: Math.floor(screenSize.width / 10),
              height: 80,
              width: screenSize.width / 1.6,
              borderWidth: 2,
              borderColor: "white",
              padding: 10,
              color: "white",
            }}
            onChangeText={setGameId}
            value={gameId}
            placeholder="123456"
          />
        </View>
      </View>
    );
  };

  const join = async (image) => {
    try {
      const game = await joinGame(gameId, user, image);
      await navigate('InGameScreen', {params: {game: game.id}})
    } catch (e) {
      alert('Oops, something went wrong! Try again.')
      setGameId('')
    }
  }

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <NftagCamera<RootStackParamList, "JoinGameScreen">
        type={CameraType.front}
        callback={join}
        overlay={renderOverlay}
      />
    </View>
  );
};

export default JoinGameScreen;
