import { apiURL } from "./common";
import { XSRF_HEADER } from "../lib/auth";
const axios = require("axios").default;

// Products
export const NEW = apiURL(`/products/new`);
export const UPDATE = apiURL(`/products/update`);
export const GET_BY_SKU = sku => apiURL(`/products/sku/${ sku }`);
export const DELETE_SKU = sku => apiURL(`/products/delete/sku/${ sku }`);


/*** Products ***/
export async function newItem(formElement) {
    return await axios.post(
        NEW, 
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
            withCredentials: true,
        }
    );
}


export async function deleteProductBySKU(sku) {
    return await axios.post(DELETE_SKU(sku), { headers: XSRF_HEADER });
}

export async function getProductBySKU(sku) {
    const res = await axios.get(GET_BY_SKU(sku));
    const product = res.data;
    return product;
}
