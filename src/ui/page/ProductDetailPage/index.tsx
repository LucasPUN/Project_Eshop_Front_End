import {useNavigate, useParams} from "react-router-dom";
import {Grid, Button, Typography, Box} from "@mui/material";
import {useContext, useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/ProductListDto";
import Loading from "../../component/Loading";
import * as ProductApi from "../../../api/ProductListApi";
import * as CartItemApi from "../../../api/CartItemApi";
import {CartItemLengthContext, LoginUserContext} from "../../../App";
import AddedToCartToast from "./compeonent/AddedToCartToast.tsx";
// @ts-ignore
import ReactImageMagnify from 'react-image-magnify';
import TopNavBar from "../../component/TopNavBar";
import QuantitySelector from "../../component/QuantitySelector";

type Params = {
  productId: string;
}

export default function ProductDetailPage() {
  const {productId} = useParams<Params>();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState<number>(1);
  const [productDetail, setProductDetail] = useState<ProductDetailDto | undefined>(undefined);
  const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const loginUser = useContext(LoginUserContext);
  const cartItemContextValue = useContext(CartItemLengthContext);

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity((quantity) => quantity - 1);
    }
  };

  const handlePlus = () => {
    if (productDetail && quantity < productDetail.stock) {
      setQuantity((quantity) => quantity + 1);
    }
  };

  const getProductDetail = async (productId: string) => {
    try {
      const response = await ProductApi.getProductDetail(productId);
      setProductDetail(response);
      document.title = response.name;
    } catch (e) {
      navigate("/error");
    }
  };

  const handleAddToCart = async () => {
    if (loginUser) {
      setIsAddingCart(true);
      await CartItemApi.putCartItem(productDetail!.id, quantity);
      setIsAddingCart(false);
      setShowToast(true);
      const data = await CartItemApi.getCartItemList();
      cartItemContextValue?.updateMyValue(data.length);
    } else if (loginUser === null) {
      navigate("/login");
    }
  };

  const renderAddToCartButton = () => {
    if (isAddingCart) {
      return (
        <Button
          variant="outlined"
          onClick={handleAddToCart}
          disabled
          sx={{
            width: '100%',
            borderColor: 'black',
            color: 'black',
            '&:hover': {
              color: 'white',
              backgroundColor: '#000000'
            },
          }}
        >
          Add To Cart
        </Button>
      );
    } else {
      return (
        <Button
          variant="outlined"
          onClick={handleAddToCart}
          sx={{
            width: '100%',
            borderColor: 'black',
            color: 'black',
            '&:hover': {
              color: 'white',
              backgroundColor: '#000000'
            },
          }}
        >
          Add To Cart
        </Button>
      );
    }
  };

  const renderSelectorAndButton = (productDetail: ProductDetailDto) => {
    if (productDetail.stock > 0) {
      return (
        <Box display="flex" justifyContent="center" alignItems="center" flexDirection="column">
          <QuantitySelector quantity={quantity} handleMinus={handleMinus} handlePlus={handlePlus}/>
          {renderAddToCartButton()}
        </Box>
      );
    } else {
      return (
        <Button variant="contained" color="error" disabled>
          Out of stock
        </Button>
      );
    }
  };

  useEffect(() => {
    if (productId) {
      getProductDetail(productId);
    } else {
      navigate("/error");
    }
  }, [productId, navigate]);

  return (
    <>
      <TopNavBar/>
      {productDetail ? (

        <Grid container justifyContent="center">
          <Grid item md={6}>
            <Box
              display="flex"
              justifyContent="center"
              alignItems="center"
              height="100vh"
            >
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: productDetail.name,
                    isFluidWidth: true,
                    src: productDetail.image_url,
                  },
                  largeImage: {
                    src: productDetail.image_url,
                    width: 1250,
                    height: 1875,
                  },
                  enlargedImageContainerDimensions: {
                    width: '80%',
                    height: '80%',
                  },
                }}
              />
            </Box>
          </Grid>

          <Grid item md={6}>
            <Box
              sx={{padding: '12px'}}
            >
              <Typography variant="h3">{productDetail.name}</Typography>
              <Typography variant="h4">Price: ${productDetail.price}</Typography>
              <Typography variant="h5">Description:</Typography>
              <Typography>{productDetail.description}</Typography>
              {renderSelectorAndButton(productDetail)}
            </Box>

          </Grid>
        </Grid>

      ) : (
        <Loading/>
      )}

      <AddedToCartToast showToast={showToast}
                        setShowToast={setShowToast}
                        quantity={quantity}
                        productDetail={productDetail}/>
    </>
  );
}
