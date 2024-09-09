import { useNavigate, useParams } from "react-router-dom";
import { Grid, Button, Typography, Box, Chip } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { ProductDetailDto } from "../../../data/ProductListDto";
import Loading from "../../component/Loading";
import * as ProductApi from "../../../api/ProductListApi";
import * as CartItemApi from "../../../api/CartItemApi";
import { CartItemLengthContext, LoginUserContext } from "../../../App";
import AddedToCartToast from "./compeonent/AddedToCartToast.tsx";
// @ts-ignore
import ReactImageMagnify from 'react-image-magnify';
import TopNavBar from "../../component/TopNavBar";
import QuantitySelector from "../../component/QuantitySelector";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeaf, faList, faSnowflake, faSun, faTag, faWind } from "@fortawesome/free-solid-svg-icons";
import Footer from "../../component/Footer.tsx";

type Params = {
  productId: string;
};

const getSeasonChipColor = (season: string) => {
  switch (season) {
    case 'SPRING':
      return { backgroundColor: '#fbffeb', color: '#4ed905' }; // Light Pink for Spring
    case 'SUMMER':
      return { backgroundColor: '#FFF3E0', color: '#FF6F00' }; // Light Orange for Summer
    case 'AUTUMN':
      return { backgroundColor: '#FBE9E7', color: '#BF360C' }; // Light Red for Autumn
    case 'WINTER':
      return { backgroundColor: '#E3F2FD', color: '#0288D1' }; // Light Blue for Winter
  }
};

export default function ProductDetailPage() {
  const { productId } = useParams<Params>();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState<number>(1);
  const [productDetail, setProductDetail] = useState<ProductDetailDto | undefined>(undefined);
  const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
  const [showToast, setShowToast] = useState<boolean>(false);

  const loginUser = useContext(LoginUserContext);
  const cartItemContextValue = useContext(CartItemLengthContext);

  const getSeasonIcon = (season: string)  => {
    switch (season) {
      case 'SPRING':
        return faLeaf; // 春天的圖示
      case 'SUMMER':
        return faSun; // 夏天的圖示
      case 'AUTUMN':
        return faWind; // 秋天的圖示
      case 'WINTER':
        return faSnowflake; // 冬天的圖示
      default:
        return faSun;
    }
  };

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handlePlus = () => {
    if (productDetail && quantity < productDetail.stock) {
      setQuantity(quantity + 1);
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
    } else {
      navigate("/login");
    }
  };

  const renderAddToCartButton = () => (
      <Button
          variant="contained"
          onClick={handleAddToCart}
          disabled={isAddingCart}
          sx={{
            width: '100%',
            backgroundColor: '#000000',
            color: '#ffffff',
            borderRadius: '8px',
            boxShadow: 1,
            '&:hover': {
              backgroundColor: '#333333',
            },
          }}
      >
        {isAddingCart ? "Adding to Cart..." : "Add To Cart"}
      </Button>
  );

  const renderSelectorAndButton = (productDetail: ProductDetailDto) => {
    if (productDetail.stock > 0) {
      return (
          <Box display="flex" flexDirection="column" alignItems="center" sx={{ mt: 2 }}>
            <QuantitySelector quantity={quantity} handleMinus={handleMinus} handlePlus={handlePlus} />
            {renderAddToCartButton()}
          </Box>
      );
    } else {
      return (
          <Button variant="contained" color="error" disabled sx={{ width: '100%', borderRadius: '8px' }}>
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
        <TopNavBar />
        {productDetail ? (
            <Grid container justifyContent="center" spacing={4} sx={{ padding: 2 }}>
              <Grid item md={6}>
                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    sx={{
                      position: 'relative',
                      zIndex: 1,
                    }}
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
                <Box sx={{ padding: '16px', backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: 1 }}>
                  <Typography variant="h3" sx={{ marginBottom: '8px' }}>{productDetail.name}</Typography>
                  <Typography variant="h4" sx={{ marginBottom: '16px' }}>Price: ${productDetail.price}</Typography>

                  {/* 顯示品牌 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', marginY: '8px' }}>
                    <FontAwesomeIcon icon={faTag} />
                    <Typography variant="h6" sx={{ marginLeft: '8px' }}>Brand: {productDetail.brand}</Typography>
                  </Box>

                  {/* 顯示分類 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', marginY: '8px' }}>
                    <FontAwesomeIcon icon={faList}  />
                    <Typography variant="h6" sx={{ marginLeft: '8px' }}>Category: {productDetail.category}</Typography>
                  </Box>

                  {/* 顯示季節 */}
                  <Box sx={{ display: 'flex', alignItems: 'center', marginY: '8px' }}>
                    <Chip
                        icon={<FontAwesomeIcon icon={getSeasonIcon(productDetail.season)}/>}
                        label={<Typography variant="h6">{productDetail.season}</Typography>}
                        sx={{
                          fontSize: '1rem',
                          backgroundColor: getSeasonChipColor(productDetail.season)?.backgroundColor ?? '#E0E0E0',
                          color: getSeasonChipColor(productDetail.season)?.color ?? '#000000',
                          borderRadius: '16px',
                          border: `1px solid ${getSeasonChipColor(productDetail.season)?.color ?? '#000000'}`,
                        }}
                    />
                  </Box>

                  <Typography variant="h6" sx={{ marginY: '16px' }}>Description:</Typography>
                  <Typography>{productDetail.description}</Typography>
                  {renderSelectorAndButton(productDetail)}
                </Box>
              </Grid>
            </Grid>
        ) : (
            <Loading />
        )}
        <AddedToCartToast
            showToast={showToast}
            setShowToast={setShowToast}
            quantity={quantity}
            productDetail={productDetail}
        />
        <Footer/>
      </>
  );
}
