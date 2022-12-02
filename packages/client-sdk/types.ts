import { User } from "firebase/auth";

export interface Game {
  id: string;
  inProgress: boolean;
  name: string;
  winner: string;
  owner: string;
  players: {
    [playerId: string]: Player;
  };
  tags: {
    [tagId: string]: Tag;
  };
}

export interface Tag {
  id: string;
  timestamp: number;
  image: {
    uri: string;
    width: number;
    height: number;
  };
  player: string;
  target: string;
  approved: {
    approved: boolean | null;
    timestamp: number;
  };
}

export interface Player {
  id: string;
  name: string;
  image: {
    uri: string;
    width: number;
    height: number;
  };
  active: boolean;
  target: string;
  tags: number;
}

export interface UserData extends User {
  stripeId: string;
  stripeLink: string;
  currentGame: string;
  ownedGame: string;
  //games: string[];
}

export type CreateGame = (name: string, owner: UserData) => Promise<string>;
export type JoinGame = (
  id: string,
  user: UserData,
  image: {
    uri: string;
    width: number;
    height: number;
  }
) => Promise<Game>;
export type StartGame = (
  id: string,
  user: UserData,
  activatePlayers?: boolean
) => Promise<Game>;
export type PauseGame = (id: string, user: UserData) => Promise<Game>;
export type ListGames = (user: UserData) => Promise<Game[]>;

export type SubmitTag = (
  game: Game,
  user: UserData,
  target: Player,
  image: {
    uri: string;
    width: number;
    height: number;
  }
) => Promise<Tag>;
export type SetTagState = (
  game: Game,
  user: UserData,
  tag: Tag,
  approved: boolean
) => Promise<Tag>;
export type ApproveTag = (game: Game, user: UserData, tag: Tag) => Promise<Tag>;
export type RejectTag = (game: Game, user: UserData, tag: Tag) => Promise<Tag>;
