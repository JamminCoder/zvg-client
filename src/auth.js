import { API_LOGOUT, API_VERIFY_AUTH } from "./apiConfig";
import { getCookie } from "./utils";

const axios = require("axios").default;

const XSRF_HEADER = { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") }

export function isLoggedIn() {
    return localStorage.getItem("logged_in") || false;
}

export async function isVerified() {
    const res = await axios.get(API_VERIFY_AUTH, { withCredentials: true });
    return res.status === 200;
}

export function logout() {
    axios.post(API_LOGOUT, { headers: XSRF_HEADER }, { withCredentials: true }).then(res => {
        localStorage.clear();
        window.location.href = "/";
        console.log("Logged out.")
        
    }).catch(err => {
        console.log("Failed to logout");
        console.log(err);
    });
}