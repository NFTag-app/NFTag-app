export type RootStackParamList = {
  Home: undefined;
  JoinGameScreen: undefined;
  CreateGameScreen: undefined;
  RegCamera: undefined;
  GameListScreen: undefined;
  GameNavigatorScreen: { gameId: string } | undefined;
};

export type InGameStackParamList = {
  InGameScreen: undefined;
  TagCameraScreen: undefined;
};
