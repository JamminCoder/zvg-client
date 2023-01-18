import { apiURL } from "./common";
import { XSRF_HEADER } from "../lib/auth";
const axios = require("axios").default;
import { AxiosResponse } from 'axios';

// Products
export const NEW = apiURL(`/products/new`);
export const UPDATE = apiURL(`/products/update`);
export const GET_BY_SKU = sku => apiURL(`/products/sku/${ sku }`);
export const DELETE_SKU = sku => apiURL(`/products/delete/sku/${ sku }`);


/*** Products ***/

/**
 * Create new item
 * @param { HTMLElement } formElement 
 * @returns { Promise<AxiosResponse<any, any>> }
 */
export async function newItem(formElement) {
    return await axios.post(
        NEW, 
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
        }
    );
}

/**
 * Gets item by stock keeping unit
 * @param { string } sku 
 * @returns { JSON } Product {  
 *  category: string,  
 *  name: string,  
 *  description: string,  
 *  price: number,  
 *  tax_percent: number,  
 *  sku: string,  
 *  stock: number  
 * } 
 */
export async function getProductBySKU(sku) {
    const res = await axios.get(GET_BY_SKU(sku));
    const product = res.data;
    return product;
}


/**
 * Deletes a product by stock keeping unit
 * @param { string } sku 
 * @returns { Promise<AxiosResponse<any, any>> }
 */
export async function deleteProductBySKU(sku) {
    return await axios.post(DELETE_SKU(sku), { headers: XSRF_HEADER });
}

