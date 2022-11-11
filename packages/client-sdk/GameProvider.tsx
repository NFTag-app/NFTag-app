import { getDatabase, onValue, ref } from "firebase/database";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Game } from "./types";

const GameContext = createContext<Game | null>(null);

const GameProvider: React.FC<{
  gameId: string;
  children: React.ReactNode;
}> = ({ gameId, children }) => {
  const [game, setGame] = useState<Game | null>(null);

  const db = getDatabase();

  useEffect(() => {
    return onValue(ref(db, `/${gameId}`), (snapshot) => {
      const data = snapshot.val();
      console.log("data", data);
      setGame(data);
    });
  });

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
