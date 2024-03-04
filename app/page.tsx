import { Container } from "@mui/material";

import { NumberGuesser } from "app/components/NumberGuesser";

export default function Home() {
  return (
    <Container
      component="main"
      maxWidth="md"
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh",
        justifyContent: "center",
      }}
    >
      <NumberGuesser />
    </Container>
  );
}
