import { Card, CardContent, CardMedia, Typography, Button, Grid } from '@mui/material';
import { ProductListDto } from '../../../../data/ProductListDto';
import { Link } from 'react-router-dom';

type Props = {
  product: ProductListDto;
}

export default function ProductList({ product }: Props) {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
      <Card sx={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '20px'}}>
        <CardMedia
          component="img"
          height="300"
          image={product.image_url}
          alt={product.name}
          sx={{
            width: '100%',
            objectFit: 'cover',
            '&:hover': {
              content: `url(${product.image_hover_url})`,
            },
          }}
        />
        <CardContent sx={{ flex: '1 0 auto', textAlign: 'center' }}>
          <Typography variant="h6" component="div" sx={{ height: '90px', overflow: 'hidden', textOverflow: 'ellipsis' }}>
            {product.name}
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            ${product.price}
          </Typography>
        </CardContent>
        <Button
          component={Link}
          to={`/product/${product.id}`}
          variant="outlined"
          sx={{
            width: '90%',
            margin: '0 auto',
            mb: 2,
            borderColor: 'black',
            color: 'black',
            '&:hover': {
              borderColor: 'black',
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          Details
        </Button>
      </Card>
    </Grid>
  );
}
