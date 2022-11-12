import { View, Text, StyleSheet } from "react-native";
import { CommonStyles } from "./styles/CommonStyles";
import { GameProvider, useGame } from "client-sdk";
import { useRef } from "react";
import { InGameStackParamList, RootStackParamList } from "./RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TagList } from "./components/in-game-screen/tag-list";
import { FloatingAction, IActionProps } from "react-native-floating-action";

const icon = require("./assets/adaptive-icon.png");

type Props = NativeStackScreenProps<InGameStackParamList, "InGameScreen">;

type Action = {
  text: string;
  icon: string;
  name: string;
  buttonSize: number;
  position: number;
  navigateTo: keyof InGameStackParamList;
  margin: number;
};

export const InGameScreen = ({ route, navigation: { navigate } }: Props) => {
  const target = useRef(null);
  const game = useGame();

  if (!game?.id) {
    return (
      <View style={CommonStyles.container}>
        <Text>MISSING GAME ID</Text>
      </View>
    );
  }

  console.log("rendering gameid", game.id);

  const actions: Action[] = [
    {
      text: "Tag!!!",
      // icon: require("./images/ic_accessibility_white.png"),
      icon: icon,
      name: "bt_tag_target",
      buttonSize: 75,
      position: 10,
      navigateTo: "TagCameraScreen",
      margin: 0,
    },
    {
      text: "Yell!!!",
      icon: icon,
      buttonSize: 75,
      name: "bt_yell",
      position: 0,
      navigateTo: "TagCameraScreen",
      margin: 0,
    },
  ];

  const onPressItem = (item) => {
    const action = actions.find((x) => x.name === item);
    console.log("pressed item", action);
    navigate(action.navigateTo);
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
