import { apiURL } from "./common";

// Content management
export const SLIDES_ALL = apiURL(`/content/slides`);
export const SLIDES_NEW = apiURL(`/content/slides/new`);
export const SLIDES_UPDATE = slideID => apiURL(`/content/slides/edit/${ slideID }`);
export const SLIDES_DELETE = slideID => apiURL(`/content/slides/delete/${ slideID }`);
export const SHOP_HEADER_UPDATE = apiURL(`/content/shop-header/update`);
export const SHOP_HEADER = apiURL(`/content/shop-header`);
export const HOMEPAGE_INFO = apiURL(`/content/homepage-info`);
export const HOMEPAGE_INFO_UPDATE = apiURL(`/content/homepage-info/update`);
