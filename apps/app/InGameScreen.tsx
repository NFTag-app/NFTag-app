import { View, Text, StyleSheet } from "react-native";
import { CommonStyles } from "./styles/CommonStyles";
import { GameProvider } from "client-sdk";
import { useRef } from "react";
import { RootStackParamList } from "./RootStackParams";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { TagList } from './components/in-game-screen/tag-list';

type Props = NativeStackScreenProps<RootStackParamList, 'InGameScreen'>;

export const InGameScreen = ({ route }: Props) => {
  const target = useRef(null)

  const gameId = route.params?.gameId;

  if (!gameId) {
    return <View style={CommonStyles.container}>
      <Text>MISSING GAME ID</Text>
    </View>
  }

  return (
    <GameProvider gameId={gameId}>
      <TagList />
    </GameProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
  },
});
