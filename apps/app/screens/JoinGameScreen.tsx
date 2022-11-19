import { useNavigation } from "@react-navigation/native";
import { joinGame, useUser } from "client-sdk";
import { UserData } from "client-sdk/dist/types";
import { CameraType } from "expo-camera";
import { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  TextInput,
} from "react-native";
import { OverlayCamera } from "../components/overlay-camera/OverlayCamera";
import { OverlayStyles } from "../components/overlay-camera/OverlayStyles";
import { RootNavigationProps } from "../RootParams";

export const JoinGameScreen = ({ tabHeight }: { tabHeight: number }) => {
  const rootNavigation = useNavigation<RootNavigationProps>();
  const user: UserData = useUser();
  const [gameId, setGameId] = useState<string>("");

  const preCaptureOverlay = (topMargin: number, bottomMargin: number) => {
    return (
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={OverlayStyles.wrapper}>
          <View style={OverlayStyles.flexContainer}>
            <View style={{ alignItems: "center", marginTop: 110 + topMargin }}>
              <Text
                style={{ fontSize: 30, color: "#FFFFFF77", marginBottom: 10 }}
              >
                Game Code
              </Text>
              <TextInput
                keyboardType="numeric"
                maxLength={6}
                autoCapitalize="characters"
                placeholderTextColor={"#FFFFFF33"}
                style={{
                  textAlign: "center",
                  fontSize: 48,
                  borderWidth: 2,
                  borderColor: "#FFFFFF77",
                  padding: 10,
                  color: "#FFFFFF77",
                }}
                onChangeText={setGameId}
                value={gameId}
                placeholder="000000"
              />
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  const saveCallback = async (uri: string, width: number, height: number) => {
    try {
      const game = await joinGame(gameId, user, { uri: uri, width, height });
      await rootNavigation.navigate("GameTabs", {
        // NAVIGATION STILL ISN'T WORKING FOR SOME REASON... SOMETHING TO DO WITH THE CAMERA?
        gameId: gameId,
      });
    } catch (e) {
      await alert(
        "Failed to join game! Check that the game code you entered was correct."
      );
    }
  };

  return (
    <View style={{ ...StyleSheet.absoluteFillObject }}>
      <OverlayCamera
        cameraType={CameraType.front}
        isNft={true}
        nftTitle={user?.displayName || "Undefined Playe Name"}
        saveCallback={saveCallback}
        captureOverlay={() => undefined}
        preCaptureOverlay={preCaptureOverlay}
        bottomInset={tabHeight}
        screenReady={!!user}
      />
    </View>
  );
};
