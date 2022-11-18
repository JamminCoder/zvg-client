import { 
    API_LOGIN, 
    API_LOGOUT,
    API_PRODUCTS_ALL,
    API_VERIFY_AUTH,
    API_PRODUCTS_DELETE_SKU,
    API_PRODUCTS_GET_BY_SKU,
    API_PRODUCTS_ALL_WITH_CATAGORY,
    API_CATAGORIES_DELETE,
    API_CATAGORIES_INFO,
    API_PRODUCTS_FROM_CATAGORY,
    API_CATAGORIES_GET,
    API_PAYPAL_CLIENT_TOKEN,
    API_PAYPAL_CLIENT_ID
} from "./apiRoutes";

import { WITH_CREDENTIALS, XSRF_HEADER } from "./lib/auth";

const axios = require("axios").default;


// Auth
export async function login(userInfo) {
    return axios.post(API_LOGIN, userInfo, WITH_CREDENTIALS);
}

export function logout() {
    return axios.post(API_LOGOUT, { headers: XSRF_HEADER }, WITH_CREDENTIALS);
}

export function checkAuth() {
    return axios.get(API_VERIFY_AUTH, WITH_CREDENTIALS);
}


// Products
export async function getAllProducts() {
    const res = await axios.get(API_PRODUCTS_ALL);
    const products = res.data;
    return products;
}

export async function deleteProductBySKU(sku) {
    return await axios.post(API_PRODUCTS_DELETE_SKU(sku), { headers: XSRF_HEADER }, WITH_CREDENTIALS);
}

export async function getProductBySKU(sku) {
    const res = await axios.get(API_PRODUCTS_GET_BY_SKU(sku));
    const product = res.data;
    return product;
}

export async function deleteCatagoryByName(name) {
    const res = await axios.post(API_CATAGORIES_DELETE(name), { headers: XSRF_HEADER }, WITH_CREDENTIALS);
    return res.data;
}


// Catagories
export async function getAllProductsWithCatagories() {
    const res = await axios.get(API_PRODUCTS_ALL);
    return res.data;
}

export async function getProductsFromCatagory(catagory) {
    const res = await axios.get(API_PRODUCTS_FROM_CATAGORY(catagory));
    return res.data;
}

export async function getCatagoryByName(catagory) {
    const res = await axios.get(API_CATAGORIES_GET(catagory));
    return res.data;
}

export async function getCatagoriesInfo() {
    const res = await axios.get(API_CATAGORIES_INFO);
    return res.data;
}
