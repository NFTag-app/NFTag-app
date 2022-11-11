import { User } from "firebase/auth";

export interface Game {
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
  name: string;
  image: string;
  alive: boolean;
  target: string;
  tags: string[];
}

export interface UserData extends User {
  stripeId: string;
  stripeLink: string;
  games: string[];
}

export type CreateGame = (name: string, owner: UserData) => Promise<Game>;
export type JoinGame = (id: string, user: UserData) => Promise<Game>;
export type ListGames = (user: UserData) => Promise<Game[]>;