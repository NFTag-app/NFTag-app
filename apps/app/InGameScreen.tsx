import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { startGame, useGame, useUser } from "client-sdk";
import { useRef } from "react";
import { StyleSheet, Text, View } from "react-native";
import { FloatingAction, IActionProps } from "react-native-floating-action";
import { TagList } from "./components/in-game-screen/tag-list";
import { InGameStackParamList } from "./RootStackParams";
import { CommonStyles } from "./styles/CommonStyles";

const icon = require("./assets/adaptive-icon.png");

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

  if (!game?.id) {
    return (
      <View style={CommonStyles.container}>
        <Text>MISSING GAME ID</Text>
      </View>
    );
  }

  console.log("rendering gameid", game.id);

  const userIsGameAdmin = game.owner === user.uid;
  const gameIsActive = game.inProgress;
  console.log("userIsGameAdmin", userIsGameAdmin);
  console.log("gameIsActive", gameIsActive);

  const tagAction = {
    text: "Tag!!!",
    // icon: require("./images/ic_accessibility_white.png"),
    icon: icon,
    name: "bt_tag_target",
    buttonSize: 75,
    position: 10,
    margin: 0,
    action: async () => navigate("TagCameraScreen"),
    condition: () => !userIsGameAdmin && gameIsActive,
  };

  const startGameAction = {
    text: "Start Game!!!",
    // icon: require("./images/ic_accessibility_white.png"),
    icon: icon,
    name: "bt_tag_start",
    buttonSize: 75,
    position: 10,
    margin: 0,
    action: async () =>
      startGame(game.id, user, true).catch((err) => console.warn(err)),
    condition: () => userIsGameAdmin && !gameIsActive,
  };

  const yellAction = {
    text: "Yell!!!",
    icon: icon,
    buttonSize: 75,
    name: "bt_yell",
    position: 0,
    margin: 0,
    action: async () => alert("YELL"),
    condition: () => true,
  };

  const actions = [
    tagAction.condition() ? tagAction : undefined,
    startGameAction.condition() ? startGameAction : undefined,
    yellAction.condition() ? yellAction : undefined,
  ].filter((f) => f) as Action[];

  const onPressItem = (item: string) => {
    const action = actions.find((x) => x.name === item);
    console.log("pressed item", action);
    if (action.condition()) {
      return action.action().catch((err) => console.warn(err));
    }
  };

  return (
    <View style={CommonStyles.container}>
      <TagList />
      <FloatingAction
        actions={actions as unknown as IActionProps[]}
        onPressItem={onPressItem}
        position={"right"}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
