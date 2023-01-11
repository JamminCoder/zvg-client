import { apiURL } from "./common";
import { XSRF_HEADER } from "../lib/auth";
const axios = require("axios").default;

// Content management
export const SLIDES_ALL = apiURL(`/content/slides`);
export const SLIDES_NEW = apiURL(`/content/slides/new`);
export const SLIDES_UPDATE = slideID => apiURL(`/content/slides/edit/${ slideID }`);
export const SLIDES_DELETE = slideID => apiURL(`/content/slides/delete/${ slideID }`);
export const SHOP_HEADER_UPDATE = apiURL(`/content/shop-header/update`);
export const SHOP_HEADER = apiURL(`/content/shop-header`);
export const HOMEPAGE_INFO = apiURL(`/content/homepage-info`);
export const HOMEPAGE_INFO_UPDATE = apiURL(`/content/homepage-info/update`);
export const CABIN_SECTION_IFRAME = apiURL("/content/cabin-section");
export const CABIN_SECTION_IFRAME_UPDATE = apiURL("/content/cabin-section/update");

export async function getSlides() {
    const res = await axios.get(SLIDES_ALL);
    return res.data;
}

export async function getHomepageInfo() {
    return await axios.get(HOMEPAGE_INFO);
}

export async function updateHomepageInfo(formElement) {
    return await axios.post(
        HOMEPAGE_INFO_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
            withCredentials: true,
        }
    );
}

export async function getShopHeader() {
    try {
        const res = await axios.get(SHOP_HEADER);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

export async function updateShopHeader(formElement) {
    return await axios.post(
        SHOP_HEADER_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
            withCredentials: true,
        }
    );
}

export async function updateCabinSectionIFrame(formElement) {
    return await axios.post(
        CABIN_SECTION_IFRAME_UPDATE, 
        new FormData(formElement), 
        { headers: XSRF_HEADER }
    );
}

export async function getCabinSectionIFrame() {
    const res = await axios.get(CABIN_SECTION_IFRAME);
    return res.data;
}