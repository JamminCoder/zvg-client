import * as contentEndpoints from "./endpoints/content";
import * as authEndpoints from "./endpoints/auth";
import * as productEndpoints from "./endpoints/products";
import * as categoryEndpoints from "./endpoints/categories";

import { WITH_CREDENTIALS, XSRF_HEADER } from "./lib/auth";

const axios = require("axios").default;


/*** Auth ***/
export async function login(userInfo) {
    return axios.post(authEndpoints.LOGIN, userInfo, WITH_CREDENTIALS);
}

export function logout() {
    return axios.post(authEndpoints.LOGOUT, { headers: XSRF_HEADER }, WITH_CREDENTIALS);
}

export function checkAuth() {
    return axios.get(authEndpoints.VERIFY_AUTH, WITH_CREDENTIALS);
}

export async function updatePassword(formElement) {
    return await axios.post(
        authEndpoints.ADMIN_PASSWORD_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
            withCredentials: true
        }
    );
}


/*** Products ***/
export async function deleteProductBySKU(sku) {
    return await axios.post(productEndpoints.DELETE_SKU(sku), { headers: XSRF_HEADER }, WITH_CREDENTIALS);
}

export async function getProductBySKU(sku) {
    const res = await axios.get(productEndpoints.GET_BY_SKU(sku));
    const product = res.data;
    return product;
}

export async function deleteCategoryByName(name) {
    const res = await axios.post(categoryEndpoints.DELETE(name), { headers: XSRF_HEADER }, WITH_CREDENTIALS);
    return res.data;
}


/*** Categories ***/ 
export async function newItem(formElement) {
    return await axios.post(
        productEndpoints.NEW, 
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
            withCredentials: true,
        }
    );
}

export async function getCategories(limit=null) {
    const queryLimit = limit ? `?limit=${ limit }`: "";
    const res = await axios.get(categoryEndpoints.ALL + queryLimit);
    const products = res.data;
    return products;
}

export async function getProductsFromCategory(category) {
    const res = await axios.get(productEndpoints.FROM_CATAGORY(category));
    return res.data;
}

export async function getCategoryByName(category) {
    const res = await axios.get(categoryEndpoints.GET(category));
    return res.data;
}

export async function getCategoriesInfo() {
    const res = await axios.get(categoryEndpoints.INFO);
    return res.data;
}

export async function newCategory(formElement) {
    return await axios.post(
        categoryEndpoints.NEW, 
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
            withCredentials: true,
        }
    );
}


/*** Content ***/
export async function getSlides() {
    const res = await axios.get(contentEndpoints.SLIDES_ALL);
    return res.data;
}

export async function getHomepageInfo() {
    return await axios.get(contentEndpoints.HOMEPAGE_INFO);
}

export async function updateHomepageInfo(formElement) {
    return await axios.post(
        contentEndpoints.HOMEPAGE_INFO_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
            withCredentials: true,
        }
    );
}

export async function getShopHeader() {
    try {
        const res = await axios.get(contentEndpoints.SHOP_HEADER);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export async function updateShopHeader(formElement) {
    return await axios.post(
        contentEndpoints.SHOP_HEADER_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
            withCredentials: true,
        }
    );
}