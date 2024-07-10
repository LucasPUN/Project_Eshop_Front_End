import TopNavBar from "../../component/TopNavBar.tsx";
import 'bootstrap/dist/css/bootstrap.min.css';
import ProductList from "./component/ProductList.tsx";
import {Container, Row} from "react-bootstrap";
import NoTransitionExample from "../../component/CorouselImage.tsx";
import {useEffect, useState} from "react";
import {ProductListDto} from "../../../data/ProductListDto.ts";
import * as ProductApi from "../../../api/ProductListApi.ts";
import {useNavigate} from "react-router-dom";
import LoadingPage from "./component/LoadingPage.tsx";

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
      <Container>

        <NoTransitionExample/>

        {
          productList ?
            <Row xs={1} sm={2} md={3} lg={4} className="g-1">
              {
                productList.map((item) => (
                  <ProductList product={item}/>
                ))
              }
            </Row> :

            <Row xs={2} md={4} className="g-1">
              {
                Array.from({length: 8}).map(() => (
                  <LoadingPage/>
                ))
              }
            </Row>
        }
      </Container>
    </>
  )
}