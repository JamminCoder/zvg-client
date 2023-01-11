import { apiURL } from "./common";
import { XSRF_HEADER } from "../lib/auth";
const axios = require("axios").default;

// Categories
export const ALL = apiURL(`/categories/all`);
export const INFO = apiURL(`/categories/info/all`);
export const NEW = apiURL(`/categories/new`);
export const GET_BY_NAME = category => apiURL(`/categories/${ category }`);
export const DELETE = category => apiURL(`/categories/delete/${ category }`);
export const UPDATE = category => apiURL(`/categories/update/${category}`);



export async function getCategories(limit=null) {
    const queryLimit = limit ? `?limit=${ limit }`: "";
    const res = await axios.get(ALL + queryLimit);
    const products = res.data;
    return products;
}


/**
 * Returns category JSON
 * @param { string } category
 * @returns {Promise} 
 * { 
 * "category": string,
 * "description": string,
 * "products": Array,
 * "image": string
 * }
 */

export async function getCategoryByName(category) {
    const res = await axios.get(GET_BY_NAME(category));
    return res.data;
}

export async function getCategoriesInfo() {
    const res = await axios.get(INFO);
    return res.data;
}

export async function newCategory(formElement) {
    return await axios.post(
        NEW, 
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
        }
    );
}

export async function deleteCategoryByName(name) {
    const res = await axios.post(DELETE(name), { headers: XSRF_HEADER });
    return res.data;
}
