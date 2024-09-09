import {Snackbar, Alert} from '@mui/material';
import {ProductDetailDto} from '../../../../data/ProductListDto.ts';

type Props = {
  showToast: boolean;
  setShowToast: (showToast: boolean) => void;
  quantity: number;
  productDetail: ProductDetailDto | undefined;
};

export default function AddedToCartToast({showToast, setShowToast, quantity, productDetail}: Props) {
  const handleClose = () => {
    setShowToast(false);
  };

  return (
    <Snackbar
      open={showToast}
      autoHideDuration={1500}
      onClose={handleClose}
      anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
    >
      <Alert onClose={handleClose} severity="success" sx={{width: '100%'}}>
        Added {quantity} {productDetail?.name} to cart
      </Alert>
    </Snackbar>
  );
}
