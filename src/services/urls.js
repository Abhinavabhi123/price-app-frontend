const serverUrl = import.meta.env.VITE_SERVER_URL;

export const adminSignupUrl = serverUrl + "/admin/signUp";
export const adminLoginUrl = serverUrl + "/admin/login";
export const postCardImageUrl = serverUrl + "/admin/uploadCardImage";
export const getCardImagesUrl = serverUrl + "/admin/getCardImages";
export const deleteCardImageUrl = serverUrl + '/admin/deleteCardImage';
export const postCardDetailsUrl = serverUrl+"/admin/postCardDetails";
export const getCardsUrl = serverUrl+"/admin/getCards";
export const deleteCardDetailsUrl = serverUrl+'/admin/deleteCardDetails';
export const activateCardUrl = serverUrl+"/admin/activateCard";
export const postArtDetailsUrl = serverUrl+"/admin/postArtDetails";
export const getArtsUrl = serverUrl+"/admin/getArts";
export const editArtDetailsUrl = serverUrl+"/admin/editArtDetails";
export const editArtWithImageUrl = serverUrl+"/admin/editArtWithImage";
export const deleteArtDetailsUrl = serverUrl+"/admin/deleteArtDetails";

// user Urls
export const googleAuthUrl = serverUrl + "/googleAuth";
export const userLoginUrl = serverUrl + "/userLogin";
export const userLoginWithMobileUrl = serverUrl+"/userLoginWithMobile";
export const getUserDetailsUrl = serverUrl+'/getUserDetails';
export const getGamesAndArtsUrl = serverUrl+"/getGamesAndArts";
export const checkAnswerUrl = serverUrl+"/checkAnswer";
export const registerUserMobileUrl =serverUrl+"/registerUserWithMobile";
