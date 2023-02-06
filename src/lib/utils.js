import { SERVER_URL, API_XSRF } from "../endpoints/common";
import { WITH_CREDENTIALS } from "./auth";

const axios = require("axios").default;

export function imageURL(imgName) {
    return `${SERVER_URL}/images/${imgName}`;
}

export function serverURL(path) {
    if (path[0] === "/") path = path.replace("/", "");
    return `${ SERVER_URL }/${ path }`;
}

export function setPreviewImage(evt, imageID) {
    var tgt = evt.target || window.event.srcElement,
        files = tgt.files;
    
    // FileReader support
    if (FileReader && files && files.length) {
        var fr = new FileReader();
        fr.onload = function () {
            document.getElementById(imageID).src = fr.result;
        }
        fr.readAsDataURL(files[0]);
    }
}

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

export function stopPropagation(e) {
    e.stopPropagation();
}


export function cookies() {
    const cookies = document.cookie.split(";");
    const cookiesObject = {};

    for (const cookie of cookies) {
        const splitCookie = cookie.split("=");
        const cookieName = splitCookie[0].trim();
        const cookieValue = splitCookie[1];
        cookiesObject[cookieName] = cookieValue
    }

    return cookiesObject;
}

export function getCookie(name) {
    return cookies()[name];
}


export async function xsrf() {
    await axios.get(API_XSRF, WITH_CREDENTIALS);

    const token = getCookie("XSRF-TOKEN");
    if (!token) console.error("Failed to get XSRF cookie.");
}