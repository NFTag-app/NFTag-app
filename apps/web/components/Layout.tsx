import { Container } from "@mantine/core";
import React from "react";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <Container
      p={0}
      m={0}
      fluid
      sx={{
        overflow: "hidden",
      }}
    >
      {children}
    </Container>
  );
};

export default Layout;
