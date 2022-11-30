import { useNavigation } from "@react-navigation/native";
import { useUser } from "client-sdk";
import {
  View,
  ImageBackground,
  Image,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  Share,
} from "react-native";
import { GameNavigationProps } from "../../components/navigation/NavigationParams";
import { CommonStyles } from "../../styles/CommonStyles";

export const ShareGameScreen = ({ gameId }: { gameId: string }) => {
  const dims = useWindowDimensions();

  const navigation = useNavigation<GameNavigationProps>();
  const owner = useUser();

  const goToGame = async () => {
    await navigation.navigate("FeedScreen");
  };

  const share = async () => {
    try {
      const res = await Share.share({
        message:
          "Join my NFTag game and have fun with crypto!\nhttps://www.nftag.app/invite.html?from=" +
          owner.displayName.split(" ")[0] +
          "&game=" +
          gameId,
      });
      if (res.action === Share.sharedAction) {
        if (res.activityType) {
          //console.log(1);
          // shared with activity type of res.activityType
        } else {
          //console.log(2);
          // shared
        }
      } else if (res.action === Share.dismissedAction) {
        //console.log(3);
        // dismissed
      }
    } catch (e) {
      console.log(e);
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
              fontSize: Math.floor(dims.width / 10),
            }}
          >
            {gameId || "000000"}
          </Text>
          <TouchableOpacity
            onPress={share}
            style={{
              backgroundColor: "#704ddb",
              paddingVertical: 15,
              paddingHorizontal: 20,
              borderRadius: 10,
            }}
          >
            <Text
              style={{
                color: "white",
                fontSize: Math.floor(dims.width / 16),
              }}
            >
              Share Link
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={goToGame}
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
            Go to Game
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

// Log out and stuff
