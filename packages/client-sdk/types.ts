import { User } from "firebase/auth";

export interface Game {
  id: string;
  inProgress: boolean;
  name: string;
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
  image: string;
  player: string;
  target: string;
  approved: {
    approved: boolean | null;
    timestamp: number;
  };
}

export interface Player {
  uid: string;
  name: string;
  image: string;
  active: boolean;
  target: string;
  tags: string[];
}

export interface UserData extends User {
  stripeId: string;
  stripeLink: string;
  games: string[];
}

export type CreateGame = (name: string, owner: UserData) => Promise<Game>;
export type JoinGame = (
  id: string,
  user: UserData,
  image: string
) => Promise<Game>;
export type StartGame = (
  id: string,
  user: UserData,
  activatePlayers?: boolean
) => Promise<Game>;
export type PauseGame = (id: string, user: UserData) => Promise<Game>;
export type ListGames = (user: UserData) => Promise<Game[]>;
