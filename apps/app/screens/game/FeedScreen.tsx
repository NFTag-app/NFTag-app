import { useNavigation } from "@react-navigation/native";
import { startGame, useGame, useUser } from "client-sdk";
import React, { useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  StyleSheet,
  useWindowDimensions,
  View,
  Text,
} from "react-native";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { TagList } from "../../components/in-game-screen/tag-list";
import { GameNavigationProps } from "../../components/navigation/NavigationParams";
import { LoadingScreen } from "../LoadingScreen";

const icon = require("../../assets/adaptive-icon.png");

//type Props = NativeStackScreenProps<InGameStackParamList, "InGameScreen">;

type Action = {
  text: string;
  icon: string;
  name: string;
  buttonSize: number;
  position: number;
  margin: number;
  condition: () => boolean;
  action: () => Promise<void>;
};

export const FeedScreen = () => {
  const gameNavigation = useNavigation<GameNavigationProps>();
  const target = useRef(null);
  const game = useGame();
  const user = useUser();
  const dims = useWindowDimensions();
  const [open, setOpen] = useState(false);

  const gameHasEnoughPlayers = Object.keys(game?.players ?? {}).length > 2;
  const userIsGameAdmin = game?.owner === user.uid;
  const gameIsStartable =
    userIsGameAdmin && !game?.inProgress && gameHasEnoughPlayers;
  const gameIsStarted = game?.inProgress;

  const AddPlayersToStartGame = () => {
    if (!gameIsStarted && !gameIsStartable) {
      return (
        <LoadingScreen
          text={`You need at least 2 players to start the game!`}
        />
      );
    }
  };

  const CapturedTagsWillShowHere = () => {
    if (gameIsStarted && Object.keys(game.tags).length < 1) {
      return <LoadingScreen text="Captured tags will appear here! Get busy!" />;
    }
  };

  const StartedTagList = () => {
    if (gameIsStarted && Object.keys(game?.tags).length > 0) {
      return <TagList />;
    }
  };

  //   <SafeAreaView
  //   style={{
  //     backgroundColor: "transparent",
  //     flex: 1,
  //     alignItems: "center",
  //     justifyContent: "center",
  //     flexDirection: "column",
  //   }}
  // >
  //   <Text
  //     style={{
  //       color: "white",
  //       fontSize: 20,
  //       fontWeight: "500",
  //     }}
  //   >
  //     {item === "NOITEMS"
  //       ? "Nothing here yet..."
  //       : "You've reached the end..."}
  //   </Text>
  //   <Image
  //     resizeMode="center"
  //     source={require("../../assets/Icons/1x/searching.png")}
  //     style={{
  //       width: 250,
  //       height: 250,
  //       alignSelf: "center",
  //       backgroundColor: "rgba(0,0,0,0)",
  //     }}
  //   />
  // </SafeAreaView>

  if (!game?.id) {
    return (
      <ImageBackground
        source={require("../../assets/Icons/1x/loginbg.png")}
        resizeMode="cover"
        style={{
          flex: 1,
          justifyContent: "center",
          width: dims.width,
          alignItems: "center",
        }}
      ></ImageBackground>
    );
  }

  interface IActionPropsExtended extends IActionProps {
    condition: () => boolean;
    action: () => Promise<void>;
    buttonSize: number;
    position: number;
  }

  const yellAction: IActionPropsExtended = {
    text: "Yell!",
    color: "#25262b",
    icon: (
      <Image
        source={require("../../assets/Icons/1x/exclaim.png")}
        style={{
          width: 50,
          height: 50,
        }}
      />
    ),
    name: "bt_tag_yell",
    buttonSize: 65,
    position: 10,
    margin: 0,
    action: async () => {},
    // pull up keyboard and do stuff
    condition: () => true,
    // anyone can post anytime for now.
  };

  const startGameAction: IActionPropsExtended = {
    text: "Start Game",
    icon: (
      <Image
        source={require("../../assets/Icons/1x/plus.png")}
        style={{
          width: 50,
          height: 50,
        }}
      />
    ),
    name: "bt_tag_start",
    color: "#25262b",
    buttonSize: 65,
    position: 10,
    margin: 0,
    action: async () => {
      await startGame(game.id, user, true).catch((err) =>
        console.log("FeedScreen.fab.startGame.error", err)
      );
    },
    condition: () => gameIsStartable,
  };

  // const shareGameAction = {
  //   // Move to a tab
  //   text: "Share Game",
  //   icon: (
  //     <Image
  //       source={require("../../assets/Icons/1x/plus.png")}
  //       style={{
  //         width: 50,
  //         height: 50,
  //         transform: [{ rotate: "45deg" }],
  //       }}
  //     />
  //   ),
  //   name: "bt_tag_share",
  //   color: "#25262b",
  //   buttonSize: 65,
  //   position: 10,
  //   margin: 0,
  //   action: async () =>
  //     Share.share({
  //       message:
  //         "Join my NFTag game and have fun with crypto!\nhttps://www.nftag.app/invite.html?from=" +
  //         user.displayName.split(" ")[0] +
  //         "&game=" +
  //         game.id,
  //     }),
  //   condition: () => userIsGameAdmin && !gameIsActive,
  // };

  const actions: IActionPropsExtended[] = [yellAction, startGameAction].filter(
    (f) => f.condition()
  );

  const onPressItem = async (item: string) => {
    try {
      const action = actions.find((x) => x.name === item);
      if (action.condition()) {
        console.log("FeedScreen.onPressItem.executing", item);
        return action.action();
      }
    } catch (ex) {
      console.log("FeedScreen.onPressItem.error", item, ex);
    }
  };

  return (
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
      <AddPlayersToStartGame />
      <CapturedTagsWillShowHere />
      <StartedTagList />

      <FloatingAction
        floatingIcon={
          <Image
            source={require("../../assets/Icons/1x/plus.png")}
            style={{
              width: 50,
              height: 50,
              transform: [{ rotate: open ? "45deg" : "0deg" }],
            }}
          />
        }
        animated={true}
        color="#25262b"
        buttonSize={75}
        visible={actions.length > 0}
        actions={actions as unknown as IActionProps[]}
        onPressItem={onPressItem}
        onOpen={() => setOpen(true)}
        onClose={() => setOpen(false)}
        position={"right"}
      />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
});
