import { apiURL } from "./common";
import { XSRF_HEADER } from "../lib/auth";
const axios = require("axios").default;

export const LOGIN = apiURL("/login");
export const LOGOUT = apiURL("/logout");
export const VERIFY_AUTH = apiURL("/test-auth");
export const ADMIN_VERIFICATION_STATUS = apiURL("/admin/verification-status");
export const ADMIN_VERIFY_EMAIL = apiURL("/admin/verify-email");
export const ADMIN_PASSWORD_UPDATE = apiURL("/admin/password-update");


export async function login(userInfo) {
    return axios.post(LOGIN, userInfo);
}

export function logout() {
    return axios.post(LOGOUT, { headers: XSRF_HEADER });
}

export function checkAuth() {
    return axios.get(VERIFY_AUTH);
}

export async function updatePassword(formElement) {
    return await axios.post(
        ADMIN_PASSWORD_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER
        }
    );
}

export async function checkEmailVerificationStatus() {
    const res = await axios.get(
        ADMIN_VERIFICATION_STATUS,
        {
            headers: XSRF_HEADER
        }
    );

    return res.data.is_verified;
}

export function sendVerifyEmailRequest() {
    console.log("Sending verification request");
    axios.get(
        ADMIN_VERIFY_EMAIL,
        {
            headers: XSRF_HEADER,
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

export async function isVerified() {
    const res = await checkAuth();
    return res.status === 200;
}