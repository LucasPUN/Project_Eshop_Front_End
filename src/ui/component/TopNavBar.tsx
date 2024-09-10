import {useContext, useEffect, useState} from 'react';
import {AppBar, Badge, Box, Container, IconButton, Toolbar, Typography, CircularProgress} from '@mui/material';
import {Link, useNavigate} from 'react-router-dom';
import {faCartShopping, faHouse, faRightToBracket, faUser, faReceipt, faBars} from '@fortawesome/free-solid-svg-icons';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {CartItemLengthContext, LoginUserContext} from '../../App.tsx';
import * as FirebaseAuthService from '../../authService/FirebaseAuthService.ts';
import ShoppingCartOffcanvas from './ShoppingCartOffcanvas.tsx';
import * as CartItemApi from '../../api/CartItemApi.ts';
import CategoryOffcanvas from './CategoryOffcanvas';
import * as ProductApi from "../../api/ProductListApi.ts";


export default function TopNavBar() {
  const loginUser = useContext(LoginUserContext);
  const cartItemContextValue = useContext(CartItemLengthContext);

  const [showCart, setShowCart] = useState<boolean>(false);
  const [showCategory, setShowCategory] = useState<boolean>(false);
  const [categories, setCategories] = useState<string[]>([]);

  const navigate = useNavigate();

  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  const handleCloseCategory = () => setShowCategory(false);
  const handleShowCategory = () => setShowCategory(true);

  const getCartItemListLength = async () => {
    try {
      const data = await CartItemApi.getCartItemList();
      cartItemContextValue?.updateMyValue(data.length);
    } catch (error) {
      navigate("/error");
    }
  };

  const getAllProduct = async () => {
    try {
      const productInfo = await ProductApi.getAllProduct();

      const uniqueCategories = [...new Set(productInfo.map((product: any) => product.category))];
      setCategories(uniqueCategories);

      document.title = "Home";
    } catch (err) {
      navigate("/error");
    }
  };

  useEffect(() => {
    if (loginUser) {
      getCartItemListLength();
      getAllProduct();
    }
  }, [loginUser]);

  const renderLoginContainer = () => {
    if (loginUser) {
      return (

        <Box sx={{display: 'flex', alignItems: 'center', color: 'white'}}>
          <Typography>{loginUser.email}</Typography>
          <IconButton onClick={() => FirebaseAuthService.handleSignOut()}>
            <FontAwesomeIcon icon={faRightToBracket} style={{color: "#ffffff", fontSize: '20px'}}/>
          </IconButton>
          <IconButton component={Link} to="/transaction">
            <FontAwesomeIcon icon={faReceipt} style={{color: "#ffffff", fontSize: '20px'}}/>
          </IconButton>
          <IconButton component={Link} to="/">
            <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff", fontSize: '20px'}}/>
          </IconButton>
          <IconButton onClick={handleShowCart}>
            <FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff", fontSize: '20px'}}/>
            <Badge badgeContent={cartItemContextValue?.cartItemLength} color="warning" sx={{ml: 2}}/>
          </IconButton>
        </Box>

      );
    } else if (loginUser === null) {
      return (
        <Box sx={{display: 'flex', alignItems: 'center', color: 'white'}}>
          <IconButton component={Link} to="/login">
            <FontAwesomeIcon icon={faUser} style={{color: "#ffffff", fontSize: '20px'}}/>
          </IconButton>
          <IconButton component={Link} to="/">
            <FontAwesomeIcon icon={faHouse} style={{color: "#ffffff", fontSize: '20px'}}/>
          </IconButton>
        </Box>
      );
    } else {
      return <CircularProgress color="inherit"/>;
    }
  };

  return (
    <>
      <ShoppingCartOffcanvas show={showCart} handleClose={handleCloseCart}/>
      <CategoryOffcanvas show={showCategory} handleClose={handleCloseCategory} categories={categories}/>
      <AppBar position="sticky" sx={{backgroundColor: '#000000'}}>
        <Toolbar>
          <Container sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <Box>
              <IconButton onClick={handleShowCategory}>
                <FontAwesomeIcon icon={faBars} style={{color: "#ffffff", fontSize: '20px'}}/>
              </IconButton>
            </Box>
            <Box>
              {renderLoginContainer()}
            </Box>
          </Container>
        </Toolbar>
      </AppBar>
    </>
  );
}
