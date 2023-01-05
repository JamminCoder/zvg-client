import { getCookie } from "./utils";
import { checkAuth, logout } from "../api";
import * as authEndpoints from "../endpoints/auth";
import axios from "axios";

export const XSRF_TOKEN = getCookie("XSRF-TOKEN");
export const XSRF_HEADER = { "X-XSRF-TOKEN": XSRF_TOKEN };
export const WITH_CREDENTIALS = { withCredentials: true };

export function isLoggedIn() {
    return localStorage.getItem("logged_in") || false;
}

export async function isVerified() {
    const res = await checkAuth();
    return res.status === 200;
}

export async function checkEmailVerificationStatus() {
    const res = await axios.get(
        authEndpoints.ADMIN_VERIFICATION_STATUS,
        {
            headers: XSRF_HEADER,
            withCredentials: true
        }
    );

    return res.data.is_verified;
}

export function sendVerifyEmailRequest() {
    console.log("Sending verification request");
    axios.get(
        authEndpoints.ADMIN_VERIFY_EMAIL,
        {
            headers: XSRF_HEADER,
            withCredentials: true
        }
    ).then(res => {
        console.log(res);
    })
    .catch(err => {
        console.log(err);
    })
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