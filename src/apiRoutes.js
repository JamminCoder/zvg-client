import { apiURL } from "./endpoints/common";

// Products
export const API_PRODUCT_NEW = apiURL(`/products/new`);
export const API_PRODUCTS_UPDATE = apiURL(`/products/update`);


// Categories
export const API_CATEGORIES_ALL = apiURL(`/categories/all`);
export const API_CATEGORIES_INFO = apiURL(`/categories/info/all`);
export const API_CATEGORIES_NEW = apiURL(`/categories/new`);
export const API_CATEGORIES_GET = category => apiURL(`/categories/${ category }`);
export const API_PRODUCTS_FROM_CATAGORY = category => apiURL(`/categories/${ category }`);
export const API_CATEGORIES_DELETE = category => apiURL(`/categories/delete/${ category }`);
export const API_CATEGORIES_UPDATE = category => apiURL(`/categories/update/${category}`);
export const API_PRODUCTS_GET_BY_SKU = sku => apiURL(`/products/sku/${ sku }`);
export const API_PRODUCTS_DELETE_SKU = sku => apiURL(`/products/delete/sku/${ sku }`);


// Content management
export const API_CONTENT_SLIDES_ALL = apiURL(`/content/slides`);
export const API_CONTENT_SLIDES_NEW = apiURL(`/content/slides/new`);
export const API_CONTENT_SLIDES_UPDATE = slideID => apiURL(`/content/slides/edit/${ slideID }`);
export const API_CONTENT_SLIDES_DELETE = slideID => apiURL(`/content/slides/delete/${ slideID }`);
export const API_CONTENT_SHOP_HEADER_UPDATE = apiURL(`/content/shop-header/update`);
export const API_CONTENT_SHOP_HEADER = apiURL(`/content/shop-header`);
export const API_CONTENT_HOMEPAGE_INFO = apiURL(`/content/homepage-info`);
export const API_CONTENT_HOMEPAGE_INFO_UPDATE = apiURL(`/content/homepage-info/update`);


// square
export const API_SQUARE_ORDER = apiURL("/square/order-checkout");
