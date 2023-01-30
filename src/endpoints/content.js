import { apiURL } from "./common";
import { XSRF_HEADER } from "../lib/auth";
import { AxiosResponse } from 'axios';
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
export const ABOUT_PAGE_UPDATE = apiURL("/content/about-page/update");
export const ABOUT_PAGE = apiURL("/content/about-page");

/**
 * Gets all of the homepage slides.
 * @returns { Promise<Array<JSON>> }
 * Array[{  
 *  header: string,  
 *  lead: string,  
 *  image_path: string,  
 *  buttons: Array[JSON]  
 * }]
 */
export async function getSlides() {
    const res = await axios.get(SLIDES_ALL);
    return res.data;
}

/**
 * Gets the homepage info banner
 * @returns { Promise<JSON> } Promise -> JSON
 * {  
 *  header: string,  
 *  lead: string,  
 * }
 */
export async function getHomepageInfo() {
    const res = await axios.get(HOMEPAGE_INFO);
    return res.data;
}


/**
 * 
 * @param { HTMLElement } formElement 
 * {  
 *  header: string,  
 *  lead: string,  
 * }
 * @returns { Promise<AxiosResponse<any, any>> } Promise -> AxiosResponse
 */
export async function updateHomepageInfo(formElement) {
    return await axios.post(
        HOMEPAGE_INFO_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
        }
    );
}

/**
 * Gets the header section for the shop.
 * @returns { Promise<JSON> | null } 
 * {  
 *  header: string,  
 *  lead: string,  
 *  image_path: string,  
 * } | null
 */
export async function getShopHeader() {
    try {
        const res = await axios.get(SHOP_HEADER);
        return res.data;
    } catch (err) {
        console.log(err);
    }
}

/**
 * Update the Shop page header section.
 * @param { HTMLElement } formElement 
 * {  
 *  header_text: text,  
 *  lead_text: text input,  
 *  image: file  
 * }
 * @returns { Promise<AxiosResponse<any, any>> } Promise -> AxiosResponse
 */
export async function updateShopHeader(formElement) {
    return await axios.post(
        SHOP_HEADER_UPDATE,
        new FormData(formElement),
        {
            headers: XSRF_HEADER,
        }
    );
}


/**
 * Update the IFrame URL for the cabin section.
 * @param { HTMLElement } formElement 
 * @returns { Promise<AxiosResponse<any, any>> } Promise -> AxiosResponse
 */
export async function updateCabinSectionIFrame(formElement) {
    return await axios.post(
        CABIN_SECTION_IFRAME_UPDATE, 
        new FormData(formElement), 
        { headers: XSRF_HEADER }
    );
}

/**
 * Get the cabin section IFrame URL.
 * @returns { string } URL
 */
export async function getCabinSectionIFrame() {
    const res = await axios.get(CABIN_SECTION_IFRAME);
    return res.data;
}

/**
 * Gets the about page.
 * @returns { Promise<JSON> | null } 
 * {  
 *  header: string,  
 *  body: string,   
 * }
 */
export async function getAboutPage() {
    const res = await axios.get(ABOUT_PAGE);
    return res.data;
}

/**
 * @param { HTMLElement } formElement 
 * @returns { Promise<AxiosResponse<any, any>> } Promise -> AxiosResponse 
 */
export async function updateAboutPage(formElement) {
    return await axios.post(
        ABOUT_PAGE_UPDATE, 
        new FormData(formElement), 
        { headers: XSRF_HEADER }
    );
}