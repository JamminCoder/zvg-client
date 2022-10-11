const axios = require("axios").default;

export function capatalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

export function slugify(string) {
    let strings = string.split(" ");
    let stringsCount = strings.length
    let result = "";
    for (let i = 0; i < stringsCount; i++) {
        let s = strings[i];
        if (s !== "") {
            if (i < stringsCount - 1) result += `${s.toLowerCase()}_`;
            else result += `${s.toLowerCase()}`;
        }
    }
    return result;
}


export function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}


export function cookies() {
    const cookies = document.cookie.split(";");
    const cookiesObject = {};

    for (const cookie of cookies) {
        const splitCookie = cookie.split("=");
        const cookieName = splitCookie[0];
        const cookieValue = splitCookie[1];
        cookiesObject[cookieName] = cookieValue
    }

    return cookiesObject;
}

export function getCookie(name) {
    return cookies()[name];
}


export async function xsrf() {
    const res = await axios.options("http://localhost:8000/sanctum/csrf-cookie");

    const token = getCookie("XSRF-TOKEN");

    if (!document.querySelector("meta[name=csrf-token]")) {
        const meta = document.createElement("meta");
        meta.setAttribute("content", token);
        meta.setAttribute("name", "csrf-token");

        document.head.appendChild(meta);
    };

    
    console.log(token);

    return token;
}