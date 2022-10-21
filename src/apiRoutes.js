export const SERVER_URL = "http://localhost:8000";
export const API_XSRF = `${ SERVER_URL }/sanctum/csrf-cookie`;
export const API_URL = `${ SERVER_URL }/api`;

export const API_PRODUCT_NEW = `${ API_URL }/products/new`;
export const API_PRODUCTS_ALL = `${ API_URL }/products/all`;
export const API_PRODUCTS_ALL_WITH_CATAGORY = `${ API_URL }/catagories/all/products`;
export const API_CATAGORIES_INFO = `${ API_URL }/catagories/info`;
export const API_PRODUCTS_UPDATE = `${ API_URL }/products/update`;

export const API_PRODUCTS_FROM_CATAGORY = catagory => `${ API_URL }/products/catagory/${ catagory }`;
export const API_CATAGORIES_DELETE = catagory => `${ API_URL }/catagories/delete/${ catagory }`;
export const API_PRODUCTS_GET_BY_SKU = sku => `${ API_URL }/products/sku/${ sku }`;
export const API_PRODUCTS_DELETE_SKU = sku => `${ API_URL }/products/delete/sku/${ sku }`;

export const API_LOGIN = `${ API_URL }/login`;
export const API_LOGOUT = `${ API_URL }/logout`;
export const API_VERIFY_AUTH = `${ API_URL }/test-auth`;
