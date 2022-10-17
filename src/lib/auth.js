import { API_VERIFY_AUTH } from "../apiRoutes";
import { getCookie } from "./utils";
import { checkAuth, logout } from "../api";

const axios = require("axios").default;

export const XSRF_HEADER = { "X-XSRF-TOKEN": getCookie("XSRF-TOKEN") };
export const WITH_CREDENTIALS = { withCredentials: true };

export function isLoggedIn() {
    return localStorage.getItem("logged_in") || false;
}

export async function isVerified() {
    const res = await checkAuth();
    return res.status === 200;
}

export function destroy_login_info() {
    logout().then(res => {
        localStorage.clear();
        window.location.href = "/#/login";
        window.location.reload();
        console.log("Logged out.")
        
    }).catch(err => {
        localStorage.clear();
        console.log(err);
    });
}