import {useNavigate, useParams} from "react-router-dom";
import {Col, Container, Row, Spinner} from "react-bootstrap";
import TopNavBar from "../../component/TopNavBar.tsx";
import QuantitySelector from "../../component/QuantitySelector.tsx";
import {useContext, useEffect, useState} from "react";
import {ProductDetailDto} from "../../../data/ProductListDto.ts";
import Loading from "../../component/Loading.tsx";
import * as ProductApi from "../../../api/ProductListApi.ts"
import * as CartItemApi from "../../../api/CartItemApi.ts";
import {CartItemLengthContext, LoginUserContext} from "../../../App.tsx";
import AddedToCartToast from "./compeonent/AddedToCartToast.tsx";
// @ts-ignore
import ReactImageMagnify from 'react-image-magnify';

type Params = {
    productId: string
}

export default function ProductDetailPage() {
    const {productId} = useParams<Params>();
    const navigate = useNavigate();

    const [quantity, setQuantity] = useState<number>(1);
    const [productDetail, setProductDetail] = useState<ProductDetailDto | undefined>(undefined);
    const [isAddingCart, setIsAddingCart] = useState<boolean>(false);
    const [showToast, setShowToast] = useState<boolean>(false);

    const loginUser = useContext(LoginUserContext)
    const cartItemContextValue = useContext(CartItemLengthContext);


    const handleMinus = () => {
        if (quantity > 1) {
            setQuantity((quantity) => quantity - 1);
        }
    }

    const handlePlus = () => {
        if (quantity < productDetail!.stock) {
            setQuantity((quantity) => quantity + 1);
        }
    }

    const getProductDetail = async (productId: string) => {
        try {
            const response = await ProductApi.getProductDetail(productId);
            setProductDetail(response);
            document.title = response.name;
        } catch (e) {
            navigate("/error")
        }
    }

    const handleAddToCart = async () => {
        if (loginUser) {
            setIsAddingCart(true);
            await CartItemApi.putCartItem(productDetail!.id, quantity);
            setIsAddingCart(false);
            setShowToast(true);
            const data = await CartItemApi.getCartItemList();
            cartItemContextValue?.updateMyValue(data.length);
        } else if (loginUser === null) {
            navigate("/login")
        }
    }

    const renderAddToCartButton = () => {
        if (isAddingCart) {
            return (
                <>
                    <div>
                        <button className="ms-5 btn btn-success" disabled>
                            <Spinner
                                as="span"
                                animation="border"
                                size="sm"
                                role="status"
                                aria-hidden="true"
                            />
                            Loading...
                        </button>
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <div>
                        <button className="ms-5 btn btn-success" onClick={handleAddToCart}>Add To Cart</button>
                    </div>
                </>
            )
        }
    }

    const renderSelectorAndButton = (productDetail: ProductDetailDto) => {
        if (productDetail.stock > 0) {
            return (
                <>
                    <div className="d-flex justify-content-center">
                        <div>
                            <QuantitySelector quantity={quantity} handleMinus={handleMinus}
                                              handlePlus={handlePlus}/>
                            <h5 className="d-flex justify-content-center mt-2">Stock: {productDetail.stock}</h5>
                        </div>
                        <div>
                            {renderAddToCartButton()}
                        </div>
                    </div>
                </>
            )
        } else {
            return (
                <div className="d-flex justify-content-center">
                    <button className="ms-5 btn btn-danger" disabled>Out of stock</button>
                </div>
            )
        }
    }

    useEffect(() => {
        if (productId) {
            getProductDetail(productId);
        } else {
            navigate("/error")
        }
    }, []);

    return (
        <>
            <TopNavBar/>
            {
                productDetail ?
                  <Container
                    style={{
                        width: '100vw',
                        height: '100vh',
                        paddingTop: '5%'
                    }}>
                      <Row className="justify-content-center align-items-center">

                          <Col md={6}>
                              <div style={{ width: '500px', height: '500px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
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
                                            width: '100%',
                                            height: '100%',
                                        },
                                    }}
                                  />
                              </div>
                          </Col>

                          <Col md={6}>
                              <div className="shadow p-5 mb-5 rounded bg-black text-white bg-opacity-50" style={{ width: '100%' }}>
                                  <h1>{productDetail.name}</h1>
                                  <h3>Price: ${productDetail.price}</h3>
                                  <h3>Description:</h3>
                                  <p>{productDetail.description}</p>
                              </div>

                              {renderSelectorAndButton(productDetail)}
                          </Col>

                      </Row>
                  </Container> :
                    <Loading/>
            }
            <AddedToCartToast showToast={showToast} setShowToast={setShowToast} quantity={quantity} productDetail={productDetail}/>
        </>
    )
}

