import { 
    API_LOGIN, 
    API_LOGOUT,
    API_PRODUCTS_ALL,
    API_VERIFY_AUTH,
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
    console.log(products);
    return products;
}