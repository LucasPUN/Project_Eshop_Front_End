import './App.css'
import {RouterProvider} from "react-router-dom";
import {createContext, useEffect, useState} from "react";
import {UserData} from "./data/UserData.ts";
import * as FirebaseAuthService from "./authService/FirebaseAuthService.ts"
import {router} from "./config/ReactRrouterConfig.tsx"


export const LoginUserContext = createContext<UserData | null | undefined>(undefined)
export const CartItemLengthContext = createContext<UpdateMyValue | undefined>(undefined);

type UpdateMyValue = {
    cartItemLength: number;
    updateMyValue: (newValue: number) => void;
};

function App() {
    const [loginUser, setLoginUser] = useState<UserData | null | undefined>(undefined);
    const [cartItemLength, setCartItemLength] = useState<number>(0);

    const updateMyValue = (newValue: number) => {
        setCartItemLength(newValue);
    };

    const cartItemContextValue: UpdateMyValue = {
        cartItemLength,
        updateMyValue,
    };

    useEffect(() => {
        FirebaseAuthService.handleOnAuthStateChanged(setLoginUser);
    }, []);

    return (
        <>
            <CartItemLengthContext.Provider  value={cartItemContextValue}>
                <LoginUserContext.Provider value={loginUser}>
                    <RouterProvider router={router}/>
                </LoginUserContext.Provider>
            </CartItemLengthContext.Provider>
        </>
    )
}

export default App
