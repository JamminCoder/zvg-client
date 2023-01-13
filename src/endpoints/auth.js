import { apiURL } from "./common";
import { XSRF_HEADER } from "../lib/auth";
const axios = require("axios").default;
import { AxiosResponse } from "axios";

export const USER = apiURL("/user");
export const LOGIN = apiURL("/login");
export const LOGOUT = apiURL("/logout");
export const VERIFY_AUTH = apiURL("/test-auth");
export const ADMIN_VERIFICATION_STATUS = apiURL("/admin/verification-status");
export const ADMIN_VERIFY_EMAIL = apiURL("/admin/verify-email");
export const ADMIN_EMAIL_UPDATE = apiURL("/admin/email-update");
export const ADMIN_PASSWORD_UPDATE = apiURL("/admin/password-update");

/**
 * Gets current user from session
 * @returns { Promise<JSON> } user
 * {  
 *      id: number  
 *      name: string  
 *      email: string  
 *      created_at: string  
 *      updated_at: string  
 *      email_verified_at: string  
 * }
 */
export async function getUser() {
    const res = await axios.get(USER);
    return res.data;
}

/**
 * Attempts to log user in using email and password
 * @param {Object} userInfo 
 * {  
 *      email: string,  
 *      password: string  
 * } 
 * @returns { Promise<AxiosResponse<any, any>> }
 */
export async function login(userInfo) {
    return axios.post(LOGIN, userInfo);
}

/**
 * Log out of session
 * @returns { Promise<AxiosResponse<any, any>> }
 */
export function logout() {
    return axios.post(LOGOUT, { headers: XSRF_HEADER });
}

/**
 * Checks if use session is valid
 * @returns { Promise<boolean> } bool
 */
export function checkAuth() {
    return axios.get(VERIFY_AUTH);
}

/**
 * Updates user's email
 * @param { HTMLElement } formElement 
 * {  
 *      email: string,  
 *      password: string  
 * }
 * @returns { Promise<AxiosResponse<any, any>> }
 */
export async function updateEmail(formElement) {
    return await axios.post(
        ADMIN_EMAIL_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER
        }
    );
}

/**
 * Updates user's password
 * @param { HTMLElement } formElement 
 * {  
 *      current_password: string,  
 *      password: string,  
 *      password_confirmation: string  
 * } 
 * @returns { Promise<AxiosResponse<any, any>> }
 */
export async function updatePassword(formElement) {
    return await axios.post(
        ADMIN_PASSWORD_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER
        }
    );
}

/**
 * Checks to see if email is verified.
 * @returns { Promise<boolean> } true | false
 */
export async function checkEmailVerificationStatus() {
    const res = await axios.get(
        ADMIN_VERIFICATION_STATUS,
        {
            headers: XSRF_HEADER
        }
    );

    return res.data.is_verified;
}

/**
 * Send request to verify email.  
 * On success a verification email will be sent to the user's inbox.
 */
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

/**
 * Logout and destroy session data
 */
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

/**
 * Checks to see if use is verified  
 * @returns { Promise<boolean> } true | false
 */
export async function isVerified() {
    const res = await checkAuth();
    return res.status === 200;
}