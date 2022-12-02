import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type HomeTabParamList = {
  HomeScreen: undefined;
  JoinGame: { tabHeight: number };
  CreateGame: undefined;
  Settings: undefined;
};

export type GameTabParamList = {
  FeedScreen: undefined;
  TagScreen: { tabHeight: number };
  TargetScreen: undefined;
  SettingsScreen: undefined;
};

export type OwnedGameTabParamList = {
  FeedScreen: undefined;
  ShareGameScreen: undefined;
  GameSettingsScreen: undefined;
};

//export type

export type RootStackParamList = {
  Login: undefined;
  GameRoot: {
    screen: keyof GameTabParamList | undefined;
    gameId: string;
  };
  OwnedGameRoot: {
    screen: keyof OwnedGameTabParamList | undefined;
    gameId: string;
  };
  HomeRoot: {
    screen: keyof HomeTabParamList | undefined;
    gameId: string;
  };
};

export type HomeNavigationProps = NativeStackNavigationProp<HomeTabParamList>;
export type GameNavigationProps = NativeStackNavigationProp<GameTabParamList>;
export type OwnedGameNavigationProps =
  NativeStackNavigationProp<OwnedGameTabParamList>;
export type RootNavigationProps = NativeStackNavigationProp<RootStackParamList>;
