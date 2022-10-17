import { API_LOGOUT, API_VERIFY_AUTH } from "../apiRoutes";
import { getCookie } from "./utils";

const axios = require("axios").default;

export const XSRF_HEADER = { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") };
export const WITH_CREDENTIALS = { withCredentials: true };

export function isLoggedIn() {
    return localStorage.getItem("logged_in") || false;
}

export async function isVerified() {
    const res = await axios.get(API_VERIFY_AUTH, WITH_CREDENTIALS);
    return res.status === 200;
}

export function logout() {
    axios.post(API_LOGOUT, { headers: XSRF_HEADER }, WITH_CREDENTIALS).then(res => {
        localStorage.clear();
        window.location.href = "/#/login";
        window.location.reload();
        console.log("Logged out.")
        
    }).catch(err => {
        localStorage.clear();
        console.log(err);
    });
}