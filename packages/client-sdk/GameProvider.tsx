import { getDatabase, onValue, ref } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Game } from "./types";
import { useUser } from "./UserProvider";

const GameContext = createContext<Game | null>(null);

const GameProvider: React.FC<{
  gameId: string;
  children: React.ReactNode;
}> = ({ gameId, children }) => {
  const [game, setGame] = useState<Game | null>(null);
  const [ready, setReady] = useState<boolean>(false);
  const db = getDatabase();

  useEffect(() => {
    if (!gameId || ready) return;

    setReady(true);

    return onValue(ref(db, `games/${gameId}`), (snapshot) => {
      const data = snapshot.val();
      setGame(data);
    });
  }, [gameId]);

  return <GameContext.Provider value={game}>{children}</GameContext.Provider>;
};

export default GameProvider;

export const useGame = () => {
  const context = useContext(GameContext);

  if (context === undefined) {
    throw new Error("useGame must be used within a GameProvider");
  }

  return context;
};

export const usePlayer = () => {
  const game = useGame();
  const user = useUser();

  if (!game || !user) return null;

  console.log("player", game.players[user.uid]);

  return game.players[user.uid];
};

export const usePlayers = () => {
  const game = useGame();
  return game?.players;
};

export const useTags = (approvedOnly: boolean = true) => {
  const game = useGame();

  if (!game) return;

  return game.tags ? Object.values(game.tags).filter((tag) => {
    return tag.approved?.approved || !approvedOnly;
  }) : undefined;
};

export const useTarget = () => {
  const user = useUser();
  const game = useGame();
  const player = usePlayer();

  if (!user || !game || !player) return null;

  console.log("target", game.players[player.target]);

  return game.players[player.target];
};
