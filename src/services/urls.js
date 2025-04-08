const serverUrl = import.meta.env.VITE_SERVER_URL;

export const adminSignupUrl = serverUrl + "/admin/signUp";
export const adminLoginUrl = serverUrl + "/admin/login";
export const postCardImageUrl = serverUrl + "/admin/uploadCardImage";
export const getCardImagesUrl = serverUrl + "/admin/getCardImages";
export const deleteCardImageUrl = serverUrl + "/admin/deleteCardImage";
export const postCardDetailsUrl = serverUrl + "/admin/postCardDetails";
export const getCardsUrl = serverUrl + "/admin/getCards";
export const deleteCardDetailsUrl = serverUrl + "/admin/deleteCardDetails";
export const activateCardUrl = serverUrl + "/admin/activateCard";
export const inactivateCardUrl = serverUrl + "/admin/inactivateCard";
export const postArtDetailsUrl = serverUrl + "/admin/postArtDetails";
export const getArtsUrl = serverUrl + "/admin/getArts";
export const editArtDetailsUrl = serverUrl + "/admin/editArtDetails";
export const editArtWithImageUrl = serverUrl + "/admin/editArtWithImage";
export const deleteArtDetailsUrl = serverUrl + "/admin/deleteArtDetails";
export const changeArtStatusUrl = serverUrl + "/admin/changeArtStatus";
export const editCardDetailsUrl = serverUrl + "/admin/editCardDetails";
export const getUsersUrl = serverUrl + "/admin/getUsers";
export const getDashboardDataUrl = serverUrl + "/admin/getDashboardData";
export const getArtForCardCreationUrl = serverUrl+"/admin/getArtForCardCreation";

// user Urls
export const googleAuthUrl = serverUrl + "/googleAuth";
export const userLoginUrl = serverUrl + "/userLogin";
export const userLoginWithMobileUrl = serverUrl + "/userLoginWithMobile";
export const getUserDetailsUrl = serverUrl + "/getUserDetails";
export const getGamesAndArtsUrl = serverUrl + "/getGamesAndArts";
export const checkAnswerUrl = serverUrl + "/checkAnswer";
export const registerUserMobileUrl = serverUrl + "/registerUserWithMobile";
export const purchaseArtUrl = serverUrl + "/purchaseArt";
export const changeUserProfileImageUrl = serverUrl + "/changeUserProfileImage";
export const getOtpUrl = serverUrl + "/getOtp";
export const updateMobileNumberUrl = serverUrl + "/updateMobileNumber";
export const getEmailOtpUrl = serverUrl + "/getEmailOtp";
export const registerUserWithEmailUrl = serverUrl + "/registerUserWithEmail";
export const checkEmailAndGetOtpUrl = serverUrl + "/checkEmailAndGetOtp";
export const verifyEmailOtpUrl = serverUrl + "/verifyEmailOtp";
export const changePasswordWithEmailUrl =
  serverUrl + "/changePasswordWithEmail";
export const checkMobileAndGetOtpUrl = serverUrl + "/checkMobileAndGetOtp";
export const verifyMobileOtpUrl = serverUrl + "/verifyMobileOtp";
export const changePasswordWithMobileUrl =
  serverUrl + "/changePasswordWithMobile";
export const getUserCouponsUrl = serverUrl + "/getUserCoupons";
export const makeCouponForAuctionUrl = serverUrl + "/makeCouponForAuction";
export const getUserAuctionCouponsUrl = serverUrl + "/getUserAuctionCoupons";
export const startAuctionUrl = serverUrl+"/startAuction";
export const getAllAuctionUrls = serverUrl+"/getAllAuctions";
export const changeUserNameUrl = serverUrl+"/changeUserName";
export const updateUserDetailsUrl = serverUrl+"/updateUserDetails";
export const auctionParticipationUrl = serverUrl+"/auctionParticipation"
export const couponForAuctionUrl = serverUrl+"/couponForAuction";
export const getWinnersUrl = serverUrl+"/getWinners";