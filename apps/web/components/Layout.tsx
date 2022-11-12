import { Container } from "@mantine/core";
import React from "react";
import { HeaderResponsive } from "./HeaderResponsive";

const Layout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <>
      <HeaderResponsive links={[{ label: "Home", href: "/" }]} />
      <Container>{children}</Container>
    </>
  );
};

export default Layout;
