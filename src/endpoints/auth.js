import { apiURL } from "./common";

export const LOGIN = apiURL("/login");
export const LOGOUT = apiURL("/logout");
export const VERIFY_AUTH = apiURL("/test-auth");
export const ADMIN_VERIFICATION_STATUS = apiURL("/admin/verification-status");
export const ADMIN_VERIFY_EMAIL = apiURL("/admin/verify-email");
export const ADMIN_PASSWORD_UPDATE = apiURL("/admin/password-update");