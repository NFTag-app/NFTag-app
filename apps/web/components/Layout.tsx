import { Container } from "@mantine/core";
import React from "react";
import { HeaderResponsive } from "./HeaderResponsive";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <HeaderResponsive links={[{ label: "Home", link: "/" }]} />
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
    </>
  );
};

export default Layout;
