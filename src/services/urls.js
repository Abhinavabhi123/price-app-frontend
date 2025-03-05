const serverUrl = import.meta.env.VITE_SERVER_URL;

export const adminSignupUrl = serverUrl + "/admin/signUp";
export const adminLoginUrl = serverUrl + "/admin/login";
export const postCardImageUrl = serverUrl + "/admin/uploadCardImage";
export const getCardImagesUrl = serverUrl + "/admin/getCardImages";
export const deleteCardImageUrl = serverUrl + '/admin/deleteCardImage';
export const postCardDetailsUrl = serverUrl+"/admin/postCardDetails";

// user Urls
export const googleAuthUrl = serverUrl + "/googleAuth";
export const userLoginUrl = serverUrl + "/userLogin";
