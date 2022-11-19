import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeTabParamList = {
  GameList: undefined;
  JoinGame: { tabHeight: number };
  CreateGame: undefined;
  Settings: undefined;
};

export type GameTabParamList = {
  Feed: undefined;
  TagScreen: { tabHeight: number };
  TargetScreen: undefined;
};

export type RootStackParamList = {
  HomeTabs: undefined;
  GameTabs: { gameId: string } | undefined;
};

export type HomeNavigationProps = NativeStackNavigationProp<HomeTabParamList>;
export type GameNavigationProps = NativeStackNavigationProp<GameTabParamList>;
export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
