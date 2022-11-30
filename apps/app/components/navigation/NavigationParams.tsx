import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeTabParamList = {
  GameList: undefined;
  JoinGame: { tabHeight: number };
  CreateGame: undefined;
  Settings: undefined;
};

export type GameTabParamList = {
  LoadingScreen1: undefined;
  LoadingScreen2: undefined;
  LoadingScreen3: undefined; // we show 3 tabs that do nothing when loading
  FeedScreen: undefined;
  TagScreen: { tabHeight: number };
  TargetScreen: undefined;
  ShareGameScreen: { gameId: string };
  GameSettingsScreen: undefined;
};

//export type

export type RootStackParamList = {
  HomeRoot: undefined;
  GameRoot: {
    screen: keyof GameTabParamList | undefined;
    params: { gameId: string } | undefined;
    gameId: string;
  };
};

export type HomeNavigationProps = NativeStackNavigationProp<HomeTabParamList>;
export type GameNavigationProps = NativeStackNavigationProp<GameTabParamList>;
export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
