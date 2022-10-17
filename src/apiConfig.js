export const SERVER_URL = "http://localhost:8000";
export const API_XSRF = `${ SERVER_URL }/sanctum/csrf-cookie`;
export const API_URL = `${ SERVER_URL }/api`;

export const API_PRODUCT_NEW = `${ API_URL }/products/new`;
export const API_PRODUCTS_ALL = `${ API_URL }/products/all`;
export const API_LOGIN = `${ API_URL }/login`;
export const API_LOGOUT = `${ API_URL }/logout`;
export const API_VERIFY_AUTH = `${ API_URL }/test-auth`;