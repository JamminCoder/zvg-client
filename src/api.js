import { 
    API_LOGIN, 
    API_LOGOUT,
    API_PRODUCTS_ALL,
    API_VERIFY_AUTH,
    API_PRODUCTS_DELETE_SKU,
    API_PRODUCTS_GET_BY_SKU,
    API_PRODUCTS_ALL_WITH_CATAGORY
} from "./apiRoutes";

import { WITH_CREDENTIALS, XSRF_HEADER } from "./lib/auth";

const axios = require("axios").default;

export async function login(userInfo) {
    return axios.post(API_LOGIN, userInfo, WITH_CREDENTIALS);
}

export function logout() {
    return axios.post(API_LOGOUT, { headers: XSRF_HEADER }, WITH_CREDENTIALS);
}

export function checkAuth() {
    return axios.get(API_VERIFY_AUTH, WITH_CREDENTIALS);
}

export async function getAllProducts() {
    const res = await axios.get(API_PRODUCTS_ALL);
    const products = res.data;
    return products;
}

export async function getAllProductsWithCatagories() {
    const res = await axios.get(API_PRODUCTS_ALL_WITH_CATAGORY);
    return res.data;
}

export async function getProductBySKU(sku) {
    const res = await axios.get(API_PRODUCTS_GET_BY_SKU(sku));
    const product = res.data;
    return product;
}

export async function deleteProductBySKU(sku) {
    return await axios.post(API_PRODUCTS_DELETE_SKU(sku), { headers: XSRF_HEADER }, WITH_CREDENTIALS);
}