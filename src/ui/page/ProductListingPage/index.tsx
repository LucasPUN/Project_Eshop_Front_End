import TopNavBar from "../../component/TopNavBar.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./component/ProductList.tsx";
import { useEffect, useState } from "react";
import { ProductListDto } from "../../../data/ProductListDto.ts";
import * as ProductApi from "../../../api/ProductListApi.ts";
import { useNavigate } from "react-router-dom";
import LoadingPage from "./component/LoadingPage.tsx";
import { Box, Grid } from "@mui/material";
import CarouselImage from "../../component/CarouselImage.tsx";
import InfiniteScroll from "../../component/InfiniteScroll.tsx";
import Footer from "../../component/Footer.tsx";

export default function ProductListingPage() {
  const [productList, setProductList] = useState<ProductListDto[] | undefined>(undefined);
  const [filteredProductList, setFilteredProductList] = useState<ProductListDto[] | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const navigate = useNavigate();

  const getAllProduct = async () => {
    try {
      const productInfo = await ProductApi.getAllProduct();
      setProductList(productInfo);
      setFilteredProductList(productInfo);
      document.title = "Home";
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    getAllProduct();
  }, []);

  useEffect(() => {
    if (productList) {
      if (selectedCategory) {
        setFilteredProductList(productList.filter(product => product.category === selectedCategory));
      } else {
        setFilteredProductList(productList);
      }
    }
  }, [selectedCategory, productList]);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <TopNavBar onCategorySelect={handleCategorySelect} />
      <CarouselImage />
      <InfiniteScroll />

      <Box
        sx={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#F5F5F5', // Light gray background
          minHeight: 'calc(100vh - 64px)' // Ensure it covers the full height minus header
        }}
      >
        {filteredProductList ? (
          <Grid container spacing={3}>
            {filteredProductList.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ProductList product={item} />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={3}>
            {Array.from({ length: 8 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <LoadingPage />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
      <Footer/>
    </>
  );
}
