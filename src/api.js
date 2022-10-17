import { API_PRODUCTS_ALL } from "./apiConfig";
import { XSRF_HEADER } from "./lib/auth";

const axios = require("axios").default;

export async function getAllProducts() {
    const res = await axios.get(API_PRODUCTS_ALL, XSRF_HEADER);
    const products = res.data;
    console.log(products);
    return products;
}