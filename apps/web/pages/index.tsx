import { Container, Stack } from "@mantine/core";
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
      ></Container>
      <Container
        fluid
        p={0}
        m={0}
        sx={{
          backgroundColor: "#2e2555",
          height: 350,
        }}
      ></Container>
    </Stack>
  );
}
