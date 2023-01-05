import { getCookie } from "./utils";

export const XSRF_TOKEN = getCookie("XSRF-TOKEN");
export const XSRF_HEADER = { "X-XSRF-TOKEN": XSRF_TOKEN };
export const WITH_CREDENTIALS = { withCredentials: true };

export function isLoggedIn() {
    return localStorage.getItem("logged_in") || false;
}