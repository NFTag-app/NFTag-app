import { View, Text, StyleSheet } from "react-native";
import { CommonStyles } from "./styles/CommonStyles";
import { GameProvider } from "client-sdk";
import { useRef } from "react";
import { RootStackParamList } from "./RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TagList } from './components/in-game-screen/tag-list';
import { FloatingAction } from "react-native-floating-action";

type Props = NativeStackScreenProps<RootStackParamList, 'InGameScreen'>;

type Action = {
    text: string,
    // icon: require("./images/ic_accessibility_white.png"),
    name: string,
    position: number,
    navigateTo: keyof RootStackParamList
}

export const InGameScreen = ({ route, navigation: { navigate } }: Props) => {
  const target = useRef(null)

  const gameId = route.params?.gameId;

  if (!gameId) {
    return <View style={CommonStyles.container}>
      <Text>MISSING GAME ID</Text>
    </View>
  }

  console.log('rendering gameid', gameId);

  const actions: Action[] = [
    {
      text: "Tag a Target!!!",
      // icon: require("./images/ic_accessibility_white.png"),
      name: "bt_tag_target",
      position: 10,
      navigateTo: 'TagCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell",
      position: 0,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell1",
      position: 1,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell2",
      position: 2,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell3",
      position: 3,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell4",
      position: 4,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell5",
      position: 5,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell6",
      position: 6,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell7",
      position: 7,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell8",
      position: 8,
      navigateTo: 'RegCamera'
    },
    {
      text: "Yell at somebody!!!",
      // icon: require("./images/ic_language_white.png"),
      name: "bt_yell9",
      position: 9,
      navigateTo: 'RegCamera'
    },
  ];

  const onPressItem = (item) => {
    const action = actions.find(x => x.name === item);
    console.log('pressed item', action);
    navigate(action.navigateTo);
  }

  return (
    <GameProvider gameId={gameId}>
      <TagList />
      <FloatingAction actions={actions} onPressItem={onPressItem} />
    </GameProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
