import React from 'react';
import Slider from 'react-slick';
import { Box, Typography } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const NoTransitionExample = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false, // You can enable arrows if needed
    fade: true, // Add fade effect
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Slider {...settings}>
        <Box
          sx={{
            position: 'relative',
            height: '600px',
            backgroundImage: 'url(https://bbgshophk.com/cdn/shop/files/Discount_SLIDE_DESK.png?v=1718971692&width=1880)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {/* You can add captions or other content here */}
            <Typography variant="h5">First slide label</Typography>
            <Typography variant="body1">Nulla vitae elit libero, a pharetra augue mollis interdum.</Typography>
          </Box>
        </Box>

        <Box
          sx={{
            position: 'relative',
            height: '600px',
            backgroundImage: 'url(https://bbgshophk.com/cdn/shop/files/BADBLOOD_SLIDESHOW_DESKTOP_04d7852b-c89a-4e07-a2d7-e136ed5d845b.png?v=1718706177&width=1770)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <Box
            sx={{
              position: 'absolute',
              bottom: '20px',
              left: '50%',
              transform: 'translateX(-50%)',
              color: 'white',
              textAlign: 'center',
            }}
          >
            {/* You can add captions or other content here */}
            <Typography variant="h5">Second slide label</Typography>
            <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</Typography>
          </Box>
        </Box>
      </Slider>
    </Box>
  );
}

export default NoTransitionExample;
