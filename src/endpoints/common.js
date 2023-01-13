export const SERVER_URL = "http://localhost:8000";
export const API_XSRF = `${ SERVER_URL }/sanctum/csrf-cookie`;
export const API_URL = `${ SERVER_URL }/api/`;
const combineURLs = require('axios/lib/helpers/combineURLs');

/**
 * Returns full URL for a given API path.
 * @param { string } path 
 * @returns { string } path joined with API_URL
 */
export const apiURL = (path) => {
    return combineURLs(API_URL, path);
}