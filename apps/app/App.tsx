import { GameProvider, useGames, UserProvider } from "client-sdk";

import Navigation from "./Navigation";

export default function App() {
  return (
    <UserProvider>
      <GameProvider gameId="ABCDEF">
        <Navigation />
        <Test />
      </GameProvider>
    </UserProvider>
  );
}

const Test = () => {
  console.log(useGames());
  return <></>;
};
