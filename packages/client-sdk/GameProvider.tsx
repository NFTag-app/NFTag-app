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

export const usePlayers = () => {
  const game = useGame();
  return game?.players;
};

export const useTags = () => {
  const game = useGame();
  return game?.tags;
};

export const useTarget = () => {
  const user = useUser();
  const game = useGame();

  if (!user || !game) return null;

  return game.players[game.players[user.uid].target];
};
