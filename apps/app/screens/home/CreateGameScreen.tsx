import { useNavigation } from "@react-navigation/native";
import { createGame, useUser } from "client-sdk";
import {
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
  Image,
  Text,
  TouchableOpacity,
} from "react-native";
import { RootNavigationProps } from "../../components/navigation/NavigationParams";
import { CommonStyles } from "../../styles/CommonStyles";

export const CreateGameScreen = () => {
  const rootNavigation = useNavigation<RootNavigationProps>();
  const user = useUser();
  const dims = useWindowDimensions();

  const _createGame = async () => {
    try {
      const id = await createGame(
        user.displayName.split(" ")[0] + "'s Game",
        user
      );
      await rootNavigation.navigate("OwnedGameRoot", {
        screen: "ShareGameScreen",
        gameId: id,
      });
    } catch (ex) {
      console.log("GameListScreen.action.create_game.error", ex);
      alert(`Oops! That didn't work! Try again(?)!`);
    }
  };

  return (
    <View style={{ ...CommonStyles.container }}>
      <ImageBackground
        source={require("../../assets/Icons/1x/loginbg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: dims.width,
          alignItems: "center",
        }}
      >
        <View
          style={{
            marginTop: -30,
            marginBottom: 20,
            borderRadius: 8,
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            width: dims.width * 0.8,
            height: dims.height * 0.45,
            backgroundColor: "#25262b",
          }}
        >
          <Image
            source={require("../../assets/Icons/1x/plus.png")}
            style={{ width: 150, height: 150 }}
          />
          <Text
            style={{
              color: "white",
              marginBottom: 10,
              fontSize: Math.floor(dims.width / 16),
            }}
          >
            // Game settings
          </Text>
        </View>
        <TouchableOpacity
          onPress={_createGame}
          style={{
            backgroundColor: "#4a368a",
            paddingVertical: 15,
            width: dims.width * 0.8,
            borderRadius: 20,
          }}
        >
          <Text
            style={{
              marginLeft: "auto",
              marginRight: "auto",
              color: "white",
              fontSize: Math.floor(dims.width / 16),
            }}
          >
            Create Game!
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({});
