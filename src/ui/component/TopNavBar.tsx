import {Badge, Container, Form, Navbar} from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import {faCartShopping, faHouse, faUser} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {useContext, useEffect, useState} from "react";
import {CartItemLengthContext, LoginUserContext} from "../../App.tsx";
import * as FirebaseAuthService from "../../authService/FirebaseAuthService.ts"
import ShoppingCartOffcanvas from "./ShoppingCartOffcanvas.tsx";
import * as CartItemApi from "../../api/CartItemApi.ts";


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
            navigate("/error")
        }
    }

    useEffect(() => {
        if (loginUser) {
            getCartItemListLength();
        }
    }, [loginUser])

    const renderLoginContainer = () => {
        if (loginUser) {
            return (
                <>
                    <div style={{color: "white"}}>
                        {loginUser.email}
                        <FontAwesomeIcon icon={faUser} style={{color: "#05f0ec",}} className="ms-2" onClick={() => {
                            FirebaseAuthService.handleSignOut()
                        }}/>
                        <Link to="/" className="ms-3"><FontAwesomeIcon icon={faHouse}
                                                                       style={{color: "#f5f5f5",}}/>
                        </Link>
                            <FontAwesomeIcon icon={faCartShopping} style={{color: "#ffffff",}} onClick={handleShow}
                                             className="ms-3"/>
                            <Badge bg="dark" className="ms-1">{cartItemContextValue?.cartItemLength}</Badge>
                    </div>

                </>
            )
        } else if (loginUser === null) {
            return (
                <>
                    <Link to="/login"><FontAwesomeIcon icon={faUser} style={{color: "#ffffff",}}
                                                       className="ms-2"/></Link>
                    <Link to="/" className="ms-3"><FontAwesomeIcon icon={faHouse} style={{color: "#f5f5f5",}}/></Link>
                </>
            )
        } else {
            return (
                <>
                    <div className="spinner-grow text-light" role="status"/>
                </>
            )
        }
    }


    return (
        <>
            <ShoppingCartOffcanvas show={show} handleClose={handleClose}/>
            <Navbar sticky="top" className="bg-body-tertiary mb-5" bg="dark" data-bs-theme="dark"
                    style={{height: "70px"}}>

                <Container className="d-flex">
                    <Form className="d-flex justify-content-start">
                        <Form.Control
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                    </Form>
                    <div className="me-5 ">
                        {renderLoginContainer()}
                    </div>
                </Container>

            </Navbar>

        </>
    )
}