import {ProductDetailDto, ProductListDto} from "../data/ProductListDto.ts";
import axios from "axios";
import getEnvConfig from "../config/EnvConfig.ts";

const baseUrl = getEnvConfig().baseUrl;

export async function getAllProduct(): Promise<ProductListDto[]> {
    try {
        const response = await axios.get<ProductListDto[]>(
            `${baseUrl}/product`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}

export async function getProductDetail(pid:string): Promise<ProductDetailDto> {
    try {
        const response = await axios.get<ProductDetailDto>(
            `${baseUrl}/product/${pid}`);
        return response.data;
    } catch (err) {
        console.error(err);
        throw err;
    }
}


