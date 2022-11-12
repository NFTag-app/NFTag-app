import { View, Text, StyleSheet } from "react-native";
import { CommonStyles } from "./styles/CommonStyles";
import { GameProvider } from "client-sdk";
import { useRef } from "react";
import { RootStackParamList } from "./RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TagList } from './components/in-game-screen/tag-list';
import { FloatingAction, IActionProps } from "react-native-floating-action";

const icon = require('./assets/adaptive-icon.png');

type Props = NativeStackScreenProps<RootStackParamList, 'InGameScreen'>;

type Action = {
    text: string,
    icon: string,
    name: string,
    buttonSize: number,
    position: number,
    navigateTo: keyof RootStackParamList,
    margin: number
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
      text: "Tag!!!",
      // icon: require("./images/ic_accessibility_white.png"),
      icon: icon,
      name: "bt_tag_target",
      buttonSize: 75,
      position: 10,
      navigateTo: 'TagCamera',
      margin: 0
    },
    {
      text: "Yell!!!",
      icon: icon,
      buttonSize: 75,
      name: "bt_yell",
      position: 0,
      navigateTo: 'RegCamera',
      margin: 0
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
      <FloatingAction actions={actions as unknown as IActionProps[]} onPressItem={onPressItem} position={'right'}/>
    </GameProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
