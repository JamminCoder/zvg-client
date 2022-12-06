// Config
export const SERVER_URL = "http://localhost:8000";
export const API_XSRF = `${ SERVER_URL }/sanctum/csrf-cookie`;
export const API_URL = `${ SERVER_URL }/api`;


// Products
export const API_PRODUCT_NEW = `${ API_URL }/products/new`;
export const API_PRODUCTS_UPDATE = `${ API_URL }/products/update`;


// Categories
export const API_PRODUCTS_ALL = `${ API_URL }/categories/all/products`;
export const API_CATEGORIES_INFO = `${ API_URL }/categories/info/all`;
export const API_CATEGORIES_NEW = `${ API_URL }/categories/new`;
export const API_CATEGORIES_GET = category => `${ API_URL }/categories/${ category }`;
export const API_PRODUCTS_FROM_CATAGORY = category => `${ API_URL }/categories/${ category }`;
export const API_CATEGORIES_DELETE = category => `${ API_URL }/categories/delete/${ category }`;
export const API_CATEGORIES_UPDATE = category => `${ API_URL }/categories/update/${category}`;
export const API_PRODUCTS_GET_BY_SKU = sku => `${ API_URL }/products/sku/${ sku }`;
export const API_PRODUCTS_DELETE_SKU = sku => `${ API_URL }/products/delete/sku/${ sku }`;


// auth
export const API_LOGIN = `${ API_URL }/login`;
export const API_LOGOUT = `${ API_URL }/logout`;
export const API_VERIFY_AUTH = `${ API_URL }/test-auth`;


// Content management
export const API_CONTENT_SLIDES_ALL = `${ API_URL }/content/slides`;
export const API_CONTENT_SLIDES_NEW = `${ API_URL }/content/slides/new`;
export const API_CONTENT_SLIDES_UPDATE = slideID => `${ API_URL }/content/slides/edit/${ slideID }`;


// paypal
export const API_PAYPAL_ORDER = `${API_URL}/orders/create`;
