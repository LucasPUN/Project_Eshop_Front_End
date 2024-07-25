import CartItemTable from "./component/cartItemTable.tsx";
import TopNavBar from "../../component/TopNavBar.tsx";
import {useContext, useEffect, useState} from "react";
import {CartItemDto} from "../../../data/CartItemDto.ts";
import * as CartItemApi from "../../../api/CartItemApi.ts"
import Loading from "../../component/Loading.tsx";
import {Button, Container} from "react-bootstrap";
import {useNavigate} from "react-router-dom";
import {LoginUserContext} from "../../../App.tsx";
import EmptyCart from "./component/EmptyCart.tsx";
import * as TransactionApi from "../../../api/TransactionApi.ts"

export default function ShoppingCartPage() {
    const navigate = useNavigate();

    const loginUser = useContext(LoginUserContext);

    const [cartItemList, setCartItemList] = useState<CartItemDto[] | undefined>(undefined)
    const [totalPrice, setTotalPrice] = useState<number>(0);
    const [isCheckout,setIsCheckout] = useState<boolean>(false);

    const getCartItemList = async () => {
        try {
            const data = await CartItemApi.getCartItemList();
            setCartItemList(data);
            calTotalPrice(data);
        } catch (error) {
            navigate("/error")
        }
    }

    useEffect(() => {
        if (loginUser) {
            getCartItemList();
        } else if (loginUser === null) {
            navigate("/login")
        }
    }, [loginUser]);

    const calTotalPrice = (cartDataList: CartItemDto[]) => {
        if (!cartDataList || cartDataList.length === 0) {
            return 0;
        }
        setTotalPrice(
            cartDataList?.map((item): number => (
                item.price * item.cart_quantity
            )).reduce((total: number, item: number) => (
                total + item
            ))
        )
    }

    const handleCheckout = async () => {
        try {
            setIsCheckout(true);
            const transactionData = await TransactionApi.prepareTransaction();
            navigate(`/checkout/${transactionData.id}`);
        } catch (error){
            navigate("/error");
        }
    }

    const renderCartItemContainer = (cartItemList: CartItemDto[]) => {
        if (cartItemList.length > 0) {
            return (
                <>
                    <h3>Shopping Cart</h3>
                    <CartItemTable cartItemList={cartItemList} setCartItemList={setCartItemList} calTotalPrice={calTotalPrice}/>
                    <div className="d-flex justify-content-end">
                        <h3>Total : ${totalPrice.toLocaleString()}</h3>
                    </div>
                    <div className="d-flex justify-content-end">
                    {
                        isCheckout?
                                <Button variant="success" style={{width: "130px"}} disabled>PAY</Button>:
                                <Button variant="success" style={{width: "130px"}} onClick={handleCheckout}>PAY</Button>

                    }
                    </div>
                </>
            )
        } else {
            return (
                <>
                    <EmptyCart/>
                </>
            )
        }

    }

    return (
        <>
            <TopNavBar/>
            <Container>

                {
                    cartItemList ?
                        renderCartItemContainer(cartItemList) :
                        <Loading/>
                }
            </Container>
        </>
    )
}