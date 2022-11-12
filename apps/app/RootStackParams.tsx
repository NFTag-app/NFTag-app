export type RootStackParamList = {
  Home: undefined;
  RegCamera: undefined;
  GameListScreen: undefined;
  GameNavigatorScreen: { gameId: string } | undefined;
};

export type InGameStackParamList = {
  InGameScreen: undefined;
  TagCameraScreen: undefined;
};
