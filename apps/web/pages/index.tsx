import { Center, Container, Group, Stack, Title } from "@mantine/core";
import MobileStoreButton from "react-mobile-store-button";
import HeroWaves from "../hero-waves.svg";

export default function Web() {
  return (
    <Stack spacing={0}>
      <Container
        p={0}
        m={0}
        sx={{
          aspectRatio: "16 / 9",
          backgroundImage: `url(${HeroWaves.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 100%",
        }}
        fluid
      >
        <Container>
          <Group>
            <Title></Title>
          </Group>
        </Container>
      </Container>
      <Container
        fluid
        p={0}
        m={0}
        sx={{
          backgroundColor: "#2e2555",
          height: 150,
        }}
      >
        <Center>
          <Stack>
            <Title>Get The App!</Title>
            <Group align="center" position="center">
              <MobileStoreButton store="ios" width={150} />
              <MobileStoreButton store="android" width={150} />
            </Group>
          </Stack>
        </Center>
      </Container>
      <Container
        p={0}
        m={0}
        mt={-1}
        sx={{
          aspectRatio: "16 / 9",
          backgroundImage: `url(${HeroWaves.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 100%",
          rotate: "180deg",
        }}
        fluid
      ></Container>
    </Stack>
  );
}
