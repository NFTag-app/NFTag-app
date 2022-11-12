import { Container, Stack } from "@mantine/core";

export default function Web() {
  return (
    <Stack>
      <Container
        p={0}
        m={0}
        sx={{
          height: 500,
          background: "red",
        }}
        fluid
      ></Container>
    </Stack>
  );
}
