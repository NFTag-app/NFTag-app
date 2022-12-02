import GameProvider, { useGame, usePlayer } from "./GameProvider";
import GoogleSignIn from "./GoogleSignin";
import {
  approveTag,
  createGame,
  joinGame,
  listGames,
  pauseGame,
  rejectTag,
  setTagState,
  startGame,
  submitTag,
} from "./Sdk";
import UserProvider, { signOut, useGames, useUser } from "./UserProvider";

import { decode } from "base-64";

if (typeof atob === "undefined") {
  global.atob = decode;
}

export {
  GoogleSignIn,
  signOut,
  UserProvider,
  useUser,
  useGames,
  GameProvider,
  useGame,
  createGame,
  joinGame,
  startGame,
  pauseGame,
  listGames,
  usePlayer,
  submitTag,
  setTagState,
  approveTag,
  rejectTag,
};
