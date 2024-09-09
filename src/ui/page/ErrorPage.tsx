import { Container, Box, Link } from "@mui/material";

export default function ErrorPage() {
  return (
    <Container>
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Link href="/" underline="none">
          <img
            src="https://colorlib.com/wp/wp-content/uploads/sites/2/404-error-template-3.png"
            alt="404 Error"
            style={{ maxWidth: "100%", height: "auto" }}
          />
        </Link>
      </Box>
    </Container>
  );
}
