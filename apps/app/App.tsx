import { GameProvider, UserProvider } from "client-sdk";

import Navigation from "./Navigation";

export default function App() {
  return (
    <UserProvider>
      <GameProvider gameId="ABCDEF">
        <Navigation />
      </GameProvider>
    </UserProvider>
  );
}
