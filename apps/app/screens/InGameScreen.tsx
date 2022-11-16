import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { startGame, useGame, useUser } from "client-sdk";
import { useRef, useState } from "react";
import {
  Image,
  ImageBackground,
  Share,
  StyleSheet,
  useWindowDimensions,
} from "react-native";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { TagList } from "../components/in-game-screen/tag-list";
import { InGameStackParamList } from "../RootStackParams";

const icon = require("../assets/adaptive-icon.png");

type Props = NativeStackScreenProps<InGameStackParamList, "InGameScreen">;

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

export const InGameScreen = ({ route, navigation: { navigate } }: Props) => {
  const target = useRef(null);
  const game = useGame();
  const user = useUser();
  const dims = useWindowDimensions();
  const [open, setOpen] = useState(false);

  if (!game?.id) {
    return (
      <ImageBackground
        source={require("../assets/Icons/1x/loginbg.png")}
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

  const userIsGameAdmin = game.owner === user.uid;
  const gameIsActive = game.inProgress;
  interface IActionPropsExtended extends IActionProps {
    condition: () => boolean;
    action: () => Promise<void>;
    buttonSize: number;
    position: number;
  }

  const tagAction: IActionPropsExtended = {
    text: "Submit Tag",
    color: "#25262b",
    icon: (
      <Image
        source={require("../assets/Icons/1x/exclaim.png")}
        style={{
          width: 50,
          height: 50,
        }}
      />
    ),
    name: "bt_tag_target",
    buttonSize: 65,
    position: 10,
    margin: 0,
    action: async () => navigate("TagCameraScreen"),
    condition: () => !userIsGameAdmin && gameIsActive,
  };

  const startGameAction = {
    text: "Start Game",
    icon: (
      <Image
        source={require("../assets/Icons/1x/plus.png")}
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
    action: async () =>
      startGame(game.id, user, true).catch((err) => console.warn(err)),
    condition: () => userIsGameAdmin && !gameIsActive,
  };

  const shareGameAction = {
    text: "Share Game",
    icon: (
      <Image
        source={require("../assets/Icons/1x/plus.png")}
        style={{
          width: 50,
          height: 50,
          transform: [{ rotate: "45deg" }],
        }}
      />
    ),
    name: "bt_tag_share",
    color: "#25262b",
    buttonSize: 65,
    position: 10,
    margin: 0,
    action: async () =>
      Share.share({
        message:
          "Join my NFTag game and have fun with crypto!\nhttps://www.nftag.app/invite.html?from=" +
          user.displayName.split(" ")[0] +
          "&game=" +
          game.id,
      }),
    condition: () => userIsGameAdmin && !gameIsActive,
  };

  const targetAction = {
    text: "View Target",
    icon: (
      <Image
        source={require("../assets/Icons/1x/plus.png")}
        style={{
          width: 50,
          height: 50,
          transform: [{ rotate: "45deg" }],
        }}
      />
    ),
    name: "bt_target",
    color: "#25262b",
    buttonSize: 65,
    position: 10,
    margin: 0,
    action: async () => navigate("TargetScreen"),
    condition: () => !userIsGameAdmin && gameIsActive,
  };

  const actions: IActionPropsExtended[] = [
    tagAction.condition() ? tagAction : undefined,
    shareGameAction.condition() ? shareGameAction : undefined,
    startGameAction.condition() ? startGameAction : undefined,
    targetAction.condition() ? targetAction : undefined,
  ].filter((f) => f) as IActionPropsExtended[];

  const onPressItem = (item: string) => {
    const action = actions.find((x) => x.name === item);
    console.log("pressed item", action);
    if (action.condition()) {
      return action.action().catch((err) => console.warn(err));
    }
  };

  return (
    <ImageBackground
      source={require("../assets/Icons/1x/loginbg.png")}
      resizeMode="cover"
      style={{
        flex: 1,
        justifyContent: "center",
        width: dims.width,
        alignItems: "center",
      }}
    >
      <TagList />
      <FloatingAction
        floatingIcon={
          <Image
            source={require("../assets/Icons/1x/plus.png")}
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
    backgroundColor: "red",
  },
});
