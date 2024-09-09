import { useContext, useEffect, useState } from 'react';
import { AppBar, Badge, Box, Container, IconButton, Toolbar, Typography, CircularProgress } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import {faCartShopping, faHouse, faRightToBracket, faUser, faReceipt} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CartItemLengthContext, LoginUserContext } from '../../App.tsx';
import * as FirebaseAuthService from '../../authService/FirebaseAuthService.ts';
import ShoppingCartOffcanvas from './ShoppingCartOffcanvas.tsx';
import * as CartItemApi from '../../api/CartItemApi.ts';


export default function TopNavBar() {
    const loginUser = useContext(LoginUserContext);
    const cartItemContextValue = useContext(CartItemLengthContext);

    const [show, setShow] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getCartItemListLength = async () => {
        try {
            const data = await CartItemApi.getCartItemList();
            cartItemContextValue?.updateMyValue(data.length);
        } catch (error) {
            navigate("/error");
        }
    };

    useEffect(() => {
        if (loginUser) {
            getCartItemListLength();
        }
    }, [loginUser]);

    const renderLoginContainer = () => {
        if (loginUser) {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  <Typography>{loginUser.email}</Typography>
                  <IconButton onClick={() => FirebaseAuthService.handleSignOut()}>
                      <FontAwesomeIcon icon={faRightToBracket} style={{ color: "#ffffff", fontSize: '20px'}} />
                  </IconButton>
                <IconButton component={Link} to="/transaction" >
                  <FontAwesomeIcon icon={faReceipt} style={{ color: "#ffffff", fontSize: '20px'}} />
                </IconButton>
                  <IconButton component={Link} to="/" >
                      <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", fontSize: '20px' }} />
                  </IconButton>
                  <IconButton onClick={handleShow} >
                      <FontAwesomeIcon icon={faCartShopping} style={{ color: "#ffffff", fontSize: '20px' }} />
                      <Badge badgeContent={cartItemContextValue?.cartItemLength} color="warning" sx={{ ml: 2 }} />
                  </IconButton>
              </Box>
            );
        } else if (loginUser === null) {
            return (
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'white' }}>
                  <IconButton component={Link} to="/login">
                      <FontAwesomeIcon icon={faUser} style={{ color: "#ffffff", fontSize: '20px' }} />
                  </IconButton>
                  <IconButton component={Link} to="/">
                      <FontAwesomeIcon icon={faHouse} style={{ color: "#ffffff", fontSize: '20px' }} />
                  </IconButton>
              </Box>
            );
        } else {
            return <CircularProgress color="inherit" />;
        }
    };

    return (
      <>
          <ShoppingCartOffcanvas show={show} handleClose={handleClose} />
          <AppBar position="sticky" sx={{ backgroundColor: '#000000' }}>
              <Toolbar>
                  <Container sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                      {renderLoginContainer()}
                  </Container>
              </Toolbar>
          </AppBar>
      </>
    );
}
