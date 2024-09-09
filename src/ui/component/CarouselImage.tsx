// @ts-ignore
import Slider from 'react-slick';
import { Box } from '@mui/material';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

export default function CarouselImage() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
  };

  return (
    <Box sx={{ width: '100%', marginBottom: '28px', marginTop: '28px'}}>
      <Slider {...settings}>
        <Box
          sx={{
            position: 'relative',
            height: '72vh',
            backgroundImage: 'url(https://bbgshophk.com/cdn/shop/files/Discount_SLIDE_DESK.png?v=1718971692&width=1880)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        <Box
          sx={{
            position: 'relative',
            height: '72vh',
            backgroundImage: 'url(https://bbgshophk.com/cdn/shop/files/BADBLOOD_SLIDESHOW_DESKTOP_04d7852b-c89a-4e07-a2d7-e136ed5d845b.png?v=1718706177&width=1770)',
            backgroundSize: 'contain',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
      </Slider>
    </Box>
  );
}
