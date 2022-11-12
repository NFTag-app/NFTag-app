import {
  Button,
  Container,
  Group,
  Image,
  MediaQuery,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { HeaderResponsive } from "../components/HeaderResponsive";
import ParticleBg from "../components/ParticleBg";
import Crypto from "../crypto.svg";
import HeroWaves from "../hero-waves.svg";

export default function Web() {
  return (
    <>
      <HeaderResponsive links={[{ label: "Home", link: "/" }]} />
      <Container
        p={0}
        m={0}
        sx={{
          height: "calc(110vh - 60px)",
          width: "100vw",
          aspectRatio: "16 / 9",
          backgroundImage: `url(${HeroWaves.src})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          backgroundPosition: "50% 100%",
        }}
        fluid
      >
        <ParticleBg />
        <Container
          sx={{
            position: "absolute",
            top: "140px",
            left: "50%",
            transform: "translateX(-50%)",
            width: "100vw",
          }}
        >
          <Group noWrap spacing={135}>
            <Stack spacing={20}>
              <Title>
                Crypto <i>was</i> complicated. We made it fun.
              </Title>
              <Text>
                NFTag is a fun and easy way to learn about crypto by creating
                your own NFT's and battling your friends at the same time.
              </Text>
              <Group noWrap mt="lg">
                <Button size="md">Get Started</Button>
                <Button size="md" variant="outline">
                  Download the App
                </Button>
              </Group>
            </Stack>
            <MediaQuery
              query="(orientation: portrait)"
              styles={{
                display: "none",
              }}
            >
              <Image src={Crypto.src} width={450} />
            </MediaQuery>
          </Group>
        </Container>
      </Container>
    </>
  );
}
