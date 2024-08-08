import TopNavBar from "../../component/TopNavBar.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./component/ProductList.tsx";
import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/ProductListDto.ts";
import * as ProductApi from "../../../api/ProductListApi.ts";
import {useNavigate} from "react-router-dom";
import LoadingPage from "./component/LoadingPage.tsx";
import {Box, Grid} from "@mui/material";
import CarouselImage from "../../component/CarouselImage.tsx";

export default function ProductListingPage() {
  const [productList, setProductList] = useState<ProductListDto[] | undefined>(undefined)
  const navigate = useNavigate();

  const getAllProduct = async () => {
    try {
      const productInfo = await ProductApi.getAllProduct();
      setProductList(productInfo);
      document.title = "Home";
    } catch (err) {
      navigate("/error")
    }

  }

  useEffect(() => {
    getAllProduct();
  }, [])

  return (
    <>
      <TopNavBar/>
      <CarouselImage/>

      <Box sx={{width: '100%', marginBottom: '8px'}}>
        {productList ? (
          <Grid container spacing={1}>
            {productList.map((item) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
                <ProductList product={item}/>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Grid container spacing={1}>
            {Array.from({length: 8}).map((_, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
                <LoadingPage/>
              </Grid>
            ))}

          </Grid>
        )
        }
      </Box>
    </>

  )
}