export type RootStackParamList = {
  LoginScreen: undefined;
  HomeScreen: undefined;
  JoinGameScreen: undefined;
  CreateGameScreen: undefined;
  RegCamera: undefined;
  GameNavigatorScreen: { gameId: string } | undefined;
};

export type InGameStackParamList = {
  InGameScreen: undefined;
  TagCameraScreen: undefined;
  TargetScreen: undefined;
};
