import { UserProvider } from "client-sdk";

import Navigation from "./Navigation";

export default function App() {

  return (
    <UserProvider>
      <Navigation />
    </UserProvider>
  );
}

