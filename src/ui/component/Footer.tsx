import React from 'react';
import { Box, Container, Grid, Typography, Link } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: 'black',
        color: 'white',
        padding: '1rem 0',
        position: 'relative',
        bottom: 0,
        width: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center">
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              About Us
            </Typography>
            <Typography variant="body2">
              We provide a range of services to help you achieve your goals.
            </Typography>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Quick Links
            </Typography>
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Home
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Contact
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2" underline="hover">
              About
            </Link>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Typography variant="h6" gutterBottom>
              Follow Us
            </Typography>
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Facebook
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Twitter
            </Link>
            <br />
            <Link href="#" color="inherit" variant="body2" underline="hover">
              Instagram
            </Link>
          </Grid>
        </Grid>
        <Typography variant="body2" align="center" mt={3}>
          © {new Date().getFullYear()} Your Company. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
