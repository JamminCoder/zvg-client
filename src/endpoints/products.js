import { apiURL } from "./common";

// Products
export const NEW = apiURL(`/products/new`);
export const UPDATE = apiURL(`/products/update`);
export const FROM_CATAGORY = category => apiURL(`/categories/${ category }`);
export const GET_BY_SKU = sku => apiURL(`/products/sku/${ sku }`);
export const DELETE_SKU = sku => apiURL(`/products/delete/sku/${ sku }`);


