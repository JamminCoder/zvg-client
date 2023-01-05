import { apiURL } from "./common";

// Categories
export const ALL = apiURL(`/categories/all`);
export const INFO = apiURL(`/categories/info/all`);
export const NEW = apiURL(`/categories/new`);
export const GET = category => apiURL(`/categories/${ category }`);
export const DELETE = category => apiURL(`/categories/delete/${ category }`);
export const UPDATE = category => apiURL(`/categories/update/${category}`);