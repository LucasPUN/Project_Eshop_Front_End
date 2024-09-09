import {createBrowserRouter} from "react-router-dom";
import ProductListingPage from "../ui/page/ProductListingPage";
import ProductDetailPage from "../ui/page/ProductDetailPage";
import ShoppingCartPage from "../ui/page/ShoppingCartPage";
import LoginPage from "../ui/page/LoginPage/LoginPage.tsx";
import CheckOutPage from "../ui/page/CheckOutPage";
import ThankYouPage from "../ui/page/ThankYouPage";
import ErrorPage from "../ui/page/ErrorPage.tsx";
import TransactionPage from "../ui/page/TransactionPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ProductListingPage/>,
        errorElement: <ErrorPage/>
    },
    {
        path: "/product/:productId",
        element: <ProductDetailPage/>
    },
    {
        path: "/shoppingcart",
        element: <ShoppingCartPage/>
    },
    {
        path: "/login",
        element: <LoginPage/>
    },
    {
        path: "/checkout/:transactionId",
        element: <CheckOutPage/>
    },
    {
        path: "/transaction",
        element: <TransactionPage/>
    },
    {
        path: "/thankyou",
        element: <ThankYouPage/>
    },
    {
        path: "/error",
        element: <ErrorPage/>
    }
])