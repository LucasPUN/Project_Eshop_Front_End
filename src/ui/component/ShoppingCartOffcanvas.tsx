import { useEffect, useState } from "react";
import { Drawer, Button, Typography, IconButton, CircularProgress, Box } from "@mui/material";
import ShoppingCartOffcanvasBody from "./ShoppingCartOffcanvasBody.tsx";
import * as cartItemApi from "../../api/CartItemApi.ts";
import { CartItemDto } from "../../data/CartItemDto.ts";
import { Link, useNavigate } from "react-router-dom";
import Loading from "./Loading.tsx";
import {faXmark} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    show: boolean;
    handleClose: () => void;
};

export default function ShoppingCartDrawer({ show, handleClose }: Props) {
    const navigate = useNavigate();

    const [cartDataList, setCartData] = useState<CartItemDto[] | undefined | null>(undefined);

    useEffect(() => {
        if (show) {
            const fetchCartData = async () => {
                try {
                    const data = await cartItemApi.getCartItemList();
                    setCartData(data);
                } catch (error) {
                    navigate("/error");
                }
            };

            fetchCartData();
        } else {
            setCartData(undefined);
        }
    }, [show, navigate]);

    const calTotalPrice = (cartDataList: CartItemDto[]) => {
        if (!cartDataList || cartDataList.length === 0) {
            return 0;
        }
        return cartDataList
          .map((item): number => item.price * item.cart_quantity)
          .reduce((total: number, item: number) => total + item, 0);
    };

    return (
      <Drawer
        anchor="right"
        open={show}
        onClose={handleClose}
      >
          <Box p={3} width={350} role="presentation">
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="h6">Shopping Cart</Typography>
                  <IconButton onClick={handleClose}>
                      <FontAwesomeIcon icon={faXmark} />
                  </IconButton>
              </Box>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
                  <Typography variant="body1">
                      Total:$
                      {cartDataList ? (
                        calTotalPrice(cartDataList).toLocaleString()
                      ) : (
                        <CircularProgress size={24} />
                      )}
                  </Typography>
                  <Link to="/shoppingcart">
                      <Button variant="outlined" size="medium" sx={{color: '#000000',  borderColor: 'black',}}>
                          Edit
                      </Button>
                  </Link>
              </Box>
              <Box>
                  {cartDataList ? (
                    cartDataList.map((item) => (
                      <ShoppingCartOffcanvasBody cartItemDto={item} key={item.pid} />
                    ))
                  ) : (
                    <Loading />
                  )}
              </Box>
          </Box>
      </Drawer>
    );
}
