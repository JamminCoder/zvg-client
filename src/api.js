import { 
    API_LOGIN, 
    API_LOGOUT,
    API_PRODUCTS_ALL,
    API_VERIFY_AUTH,
    API_PRODUCTS_DELETE_SKU,
    API_PRODUCTS_GET_BY_SKU,
    API_PRODUCTS_ALL_WITH_CATAGORY,
    API_CATEGORIES_DELETE,
    API_CATEGORIES_INFO,
    API_PRODUCTS_FROM_CATAGORY,
    API_CATEGORIES_GET,
    API_PAYPAL_CLIENT_TOKEN,
    API_PAYPAL_CLIENT_ID,
    API_CONTENT_SLIDES_ALL
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

export async function deleteCategoryByName(name) {
    const res = await axios.post(API_CATEGORIES_DELETE(name), { headers: XSRF_HEADER }, WITH_CREDENTIALS);
    return res.data;
}


// Categories
export async function getAllProductsWithCategories() {
    const res = await axios.get(API_PRODUCTS_ALL);
    return res.data;
}

export async function getProductsFromCategory(category) {
    const res = await axios.get(API_PRODUCTS_FROM_CATAGORY(category));
    return res.data;
}

export async function getCategoryByName(category) {
    const res = await axios.get(API_CATEGORIES_GET(category));
    return res.data;
}

export async function getCategoriesInfo() {
    const res = await axios.get(API_CATEGORIES_INFO);
    return res.data;
}


// Content
export async function getSlides() {
    const res = await axios.get(API_CONTENT_SLIDES_ALL);
    return res.data;
}

