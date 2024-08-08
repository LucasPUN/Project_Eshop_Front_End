import { Container, Box } from "@mui/material";

export default function Loading() {
    return (
      <Container>
          <Box
            sx={{
                height: "80vh",
                backgroundImage: "url(/img/LoadingImg.png)",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundSize: "contain",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
          />
      </Container>
    );
}
