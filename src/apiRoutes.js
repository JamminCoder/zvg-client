import { apiURL } from "./endpoints/common";


// Content management
export const API_CONTENT_SLIDES_ALL = apiURL(`/content/slides`);
export const API_CONTENT_SLIDES_NEW = apiURL(`/content/slides/new`);
export const API_CONTENT_SLIDES_UPDATE = slideID => apiURL(`/content/slides/edit/${ slideID }`);
export const API_CONTENT_SLIDES_DELETE = slideID => apiURL(`/content/slides/delete/${ slideID }`);
export const API_CONTENT_SHOP_HEADER_UPDATE = apiURL(`/content/shop-header/update`);
export const API_CONTENT_SHOP_HEADER = apiURL(`/content/shop-header`);
export const API_CONTENT_HOMEPAGE_INFO = apiURL(`/content/homepage-info`);
export const API_CONTENT_HOMEPAGE_INFO_UPDATE = apiURL(`/content/homepage-info/update`);


// square
export const API_SQUARE_ORDER = apiURL("/square/order-checkout");
