import { API_VERIFY_AUTH } from "./apiConfig";

const axios = require("axios").default;

export function hasJwt() {
    if (localStorage.getItem("jwt")) return true;
    
    return false;
}

export async function isVerified() {
    const res = await axios.get(API_VERIFY_AUTH, {headers: {...authHeader()}});
    return res.data.ok;
}

export function logout() {
    localStorage.clear();
    window.location.href = "/";
}

export function authHeader() {
    return { Authorization: `Bearer ${localStorage.getItem("jwt")}` };
}