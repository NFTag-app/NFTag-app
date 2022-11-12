import {
  Avatar,
  Box,
  Button,
  Card,
  Center,
  Container,
  Group,
  Paper,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { getApps, initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { useState } from "react";
import Logo from "../Artboard 1 copy.svg";
import { firebaseConfig } from "../firebase-config";
import HeroWaves from "../loginbg.svg";

if (getApps().length < 1) initializeApp(firebaseConfig);

const Invite = () => {
  const {
    query: { from, game },
  } = useRouter();

  const theme = useMantineTheme();

  if (!from || !game) return <></>;

  const [photo, setPhoto] = useState("");

  const firestore = getFirestore();
  const db = getDatabase();
  const router = useRouter();
  const mobile = useMediaQuery("(orientation: portrait)");

  getDoc(doc(firestore, `/customers/${from}`)).then((snapshot) => {
    const data = snapshot.data();
  });

  return (
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
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
      fluid
    >
      <Box
        sx={{
          position: "absolute",
          width: "100vw",
          height: "100vh",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Card
          radius="md"
          mb={200}
          withBorder
          shadow="xl"
          sx={{
            width: 350,
            height: 400,
            transform: mobile ? "" : "scale(1.4)",
          }}
        >
          <Stack
            align="center"
            sx={{
              display: "flex",
              textAlign: "center",
              justifyContent: "space-between",
              height: "100%",
            }}
          >
            <Center>
              <Avatar
                src={Logo.src}
                alt=""
                size="xl"
                radius="xl"
                sx={{
                  border: `2px solid ${theme.colors.dark[4]}`,
                }}
              />
            </Center>
            <Stack>
              <Text size="xl" weight={700}>
                {from || "User"} invited you to battle.
              </Text>
              <Text size="md">Are you up for the challenge?</Text>
            </Stack>
            <Paper
              radius="md"
              style={{
                backgroundColor: theme.colors.dark[8],
                width: "100%",
                height: "50px",
              }}
            >
              <Group px={5} spacing={10} noWrap>
                {game
                  .toString()
                  .split("")
                  .filter((x, i) => i < 3)
                  .map((char, key) => (
                    <Paper
                      sx={{
                        backgroundColor: theme.colors.dark[7],
                        width: "100%",
                        height: "50px",
                      }}
                    >
                      <Text
                        size={28}
                        weight={700}
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {char}
                      </Text>
                    </Paper>
                  ))}
                <Text weight={900}>—</Text>
                {game
                  .toString()
                  .split("")
                  .filter((x, i) => i > 2)
                  .map((char, key) => (
                    <Paper
                      sx={{
                        backgroundColor: theme.colors.dark[7],
                        width: "100%",
                        height: "50px",
                      }}
                    >
                      <Text
                        size={28}
                        weight={700}
                        sx={{
                          width: "100%",
                          height: "100%",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {char}
                      </Text>
                    </Paper>
                  ))}
              </Group>
            </Paper>
            <Stack
              sx={{
                width: "100%",
              }}
            >
              <Button
                component="a"
                href={`nftag://invite?code=${game}`}
                fullWidth
              >
                Accept Invite
              </Button>
              <Button fullWidth variant="outline">
                Download the App
              </Button>
            </Stack>
          </Stack>
        </Card>
      </Box>
    </Container>
  );
};

export default Invite;
