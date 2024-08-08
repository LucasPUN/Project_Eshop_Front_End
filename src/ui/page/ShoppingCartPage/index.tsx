import CartItemTable from "./component/cartItemTable.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {CartItemDto} from "../../../data/CartItemDto.ts";
import * as CartItemApi from "../../../api/CartItemApi.ts";
import Loading from "../../component/Loading.tsx";
import {Button, Container, Typography, Box} from "@mui/material";
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../../App.tsx";
import EmptyCart from "./component/EmptyCart.tsx";
import * as TransactionApi from "../../../api/TransactionApi.ts";

export default function ShoppingCartPage() {
  const navigate = useNavigate();
  const loginUser = useContext(LoginUserContext);

  const [cartItemList, setCartItemList] = useState<CartItemDto[] | undefined>(undefined);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [isCheckout, setIsCheckout] = useState<boolean>(false);

  const getCartItemList = async () => {
    try {
      const data = await CartItemApi.getCartItemList();
      setCartItemList(data);
      calTotalPrice(data);
    } catch (error) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (loginUser) {
      getCartItemList();
    } else if (loginUser === null) {
      navigate("/login");
    }
  }, [loginUser]);

  const calTotalPrice = (cartDataList: CartItemDto[]) => {
    if (!cartDataList || cartDataList.length === 0) {
      setTotalPrice(0);
      return;
    }
    const total = cartDataList
      .map((item) => item.price * item.cart_quantity)
      .reduce((total, item) => total + item, 0);
    setTotalPrice(total);
  };

  const handleCheckout = async () => {
    try {
      setIsCheckout(true);
      const transactionData = await TransactionApi.prepareTransaction();
      navigate(`/checkout/${transactionData.id}`);
    } catch (error) {
      navigate("/error");
    }
  };

  const renderCartItemContainer = (cartItemList: CartItemDto[]) => {
    if (cartItemList.length > 0) {
      return (
        <Container>
          <Typography variant="h4" gutterBottom sx={{marginTop: "12px"}}>
            Shopping Cart
          </Typography>
          <CartItemTable
            cartItemList={cartItemList}
            setCartItemList={setCartItemList}
            calTotalPrice={calTotalPrice}
          />
          <Box display="flex" mt={2}
               sx={{
                 justifyContent: 'center',
                 width: '100%',
               }}>
            <Typography variant="h5">Total: ${totalPrice.toLocaleString()}</Typography>
          </Box>
          <Box display="flex" mt={2} mb={2}>
            <Button
              variant="outlined"
              size="large"
              onClick={handleCheckout}
              disabled={isCheckout}
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
              PAY
            </Button>
          </Box>
        </Container>
      );
    } else {
      return <EmptyCart/>;
    }
  };

  return (
    <>
      <TopNavBar/>
      <Container>
        {cartItemList ? renderCartItemContainer(cartItemList) : <Loading/>}
      </Container>
    </>
  );
}
