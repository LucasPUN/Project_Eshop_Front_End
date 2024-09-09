import axios from "axios";
import * as FirebaseAuthService from "../authService/FirebaseAuthService.ts";
import {CartItemDto} from "../data/CartItemDto.ts";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

const getAuthConfig = async () => {
    const accessToken = await FirebaseAuthService.getAccessToken();
    if (!accessToken) {
        throw new Error();
    }
    return {headers: {Authorization: `Bearer ${accessToken}`}}
}

export const putCartItem = async (pid: number, quantity: number) => {
    try {
        await axios.put(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const getCartItemList = async (): Promise<CartItemDto[]> => {
    try {
        const response = await axios.get<CartItemDto[]>(
            `${baseUrl}/cart`,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const patchCartItem = async (pid: number, quantity: number): Promise<CartItemDto> => {
    try {
        const response = await axios.patch<CartItemDto>(
            `${baseUrl}/cart/${pid}/${quantity}`,
            null,
            await getAuthConfig()
        );
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

export const deleteCartItem = async (pid: number) => {
    try {
        await axios.delete(
            `${baseUrl}/cart/${pid}`,
            await getAuthConfig()
        );
    } catch (error) {
        console.error(error);
        throw error;
    }
}