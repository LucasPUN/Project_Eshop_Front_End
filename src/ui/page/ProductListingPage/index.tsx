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

  const fetchAllProducts = async () => {
    try {
      const products = await ProductApi.getAllProduct();
      setProductList(products);
      setFilteredProductList(products);
      document.title = "Home";
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, []);

  useEffect(() => {
    if (productList) {
      if (selectedCategory === "All" || selectedCategory === null) {
        setFilteredProductList(productList);
      } else {
        setFilteredProductList(productList.filter(product => product.category === selectedCategory));
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
          minHeight: 'calc(100vh - 64px)', // Ensure it covers the full height minus header
        }}
      >
        <Grid container spacing={3}>
          {filteredProductList ? (
            filteredProductList.length > 0 ? (
              filteredProductList.map((item) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                  <ProductList product={item} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={{ textAlign: 'center', padding: '16px' }}>No products found</Box>
              </Grid>
            )
          ) : (
            Array.from({ length: 8 }).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <LoadingPage />
              </Grid>
            ))
          )}
        </Grid>
      </Box>
      <Footer />
    </>
  );
}
