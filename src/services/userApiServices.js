import axios from "axios";
import {
  errorToast,
  successToast,
} from "../components/Notification/Notification";
import {
  auctionParticipationUrl,
  changePasswordWithEmailUrl,
  changePasswordWithMobileUrl,
  changeUserNameUrl,
  changeUserProfileImageUrl,
  checkAnswerUrl,
  checkEmailAndGetOtpUrl,
  checkMobileAndGetOtpUrl,
  couponForAuctionUrl,
  getAllAuctionUrls,
  getEmailOtpUrl,
  getGamesAndArtsUrl,
  getOtpUrl,
  getUserAuctionCouponsUrl,
  getUserCouponsUrl,
  getUserDetailsUrl,
  getWinnersUrl,
  googleAuthUrl,
  makeCouponForAuctionUrl,
  purchaseArtUrl,
  registerUserMobileUrl,
  registerUserWithEmailUrl,
  startAuctionUrl,
  updateMobileNumberUrl,
  updateUserDetailsUrl,
  userLoginUrl,
  userLoginWithMobileUrl,
  verifyEmailOtpUrl,
  verifyMobileOtpUrl,
} from "./urls";
import { clearUser, setUser } from "../utils/store/userSlice";

const token = localStorage.getItem("PrizeUserTkn");

// user login with email and password
export async function userLoginWithEmail(
  data,
  navigate,
  setSubmitting,
  dispatch
) {
  try {
    await axios
      .get(userLoginUrl, {
        headers: {
          "Content-Type": "application/json",
          ...data,
        },
      })
      .then((response) => {
        if (response?.status === 200 && response?.data?.isSuccess) {
          localStorage.setItem("PrizeUserTkn", response?.data?.token);
          dispatch(setUser(response?.data));
          successToast(response?.data?.message);
          navigate("/");
        }
      });
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// user Login with mobile and password
export async function userLoginWithMobile(
  data,
  navigate,
  setSubmitting,
  dispatch
) {
  try {
    const response = await axios.get(userLoginWithMobileUrl, {
      headers: {
        "Content-Type": "application/json",
        ...data,
      },
    });
    if (response?.status === 200 && response?.data?.isSuccess) {
      localStorage.setItem("PrizeUserTkn", response?.data?.token);
      dispatch(setUser(response?.data));
      successToast(response?.data?.message);
      navigate("/");
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

export function userLogout(navigate, dispatch) {
  try {
    localStorage.removeItem("PrizeUserTkn");
    dispatch(clearUser());
    navigate("/home");
  } catch (error) {
    console.error(error);
  }
}

// Login and registration using google cloud service
export async function GoogleAuthentication(data, navigate, dispatch) {
  try {
    await axios
      .post(
        googleAuthUrl,
        {
          name: data?.name,
          email: data?.email,
          picture: data?.picture,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response?.status === 200 && response?.data?.isSuccess) {
          dispatch(setUser(response?.data));
          localStorage.setItem("PrizeUserTkn", response?.data?.token);
          navigate("/");
        }
      });
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// function to get user data
export async function getUserDetails(
  id,
  updateState,
  setCollectionData = () => {}
) {
  try {
    const response = await axios.get(getUserDetailsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id,
      },
    });

    if (response.status === 200 && response?.data?.isSuccess) {
      updateState(response?.data?.data);
      setCollectionData(response?.data?.data?.purchasedArts);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// function to get game and art data for games page
export async function getGamesAndArts(setLoading, setCards, setNextCard) {
  try {
    const response = await axios.get(getGamesAndArtsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      setLoading(false);
      setCards(response?.data?.cardData);
      setNextCard(response?.data?.nextCard);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// function to check the anser before buying art
export async function checkAnswer(
  answer,
  id,
  setArtData,
  setSubmitting,
  cardId
) {
  try {
    const response = await axios.get(checkAnswerUrl, {
      headers: {
        "Content-Type": "application/json",
        id,
        answer,
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setArtData((prev) =>
        prev.map((item) =>
          item._id === cardId ? { ...item, isAnswered: true } : item
        )
      );
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to register user with mobile number
export async function userRegisterWithMobile(
  data,
  otp,
  navigate,
  setSubmitting,
  setShowOtp
) {
  try {
    const response = await axios.post(
      registerUserMobileUrl,
      { ...data, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      navigate("/login");
      setShowOtp(false);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// Function to user can  purchase art

export async function purchaseArt(cardData, userId, setChanged, setPurchasing) {
  try {
    const response = await axios.get(purchaseArtUrl, {
      headers: {
        "Content-Type": "application/json",
        id: cardData?.name?._id,
        quantity: cardData?.quantity,
        Authorization: `Bearer ${token}`,
        cardId: cardData?._id,
        userId,
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChanged((prev) => !prev);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setPurchasing(false);
  }
}

// function to change changeUserProfileImage
export async function changeUserProfileImage(
  data,
  resetForm,
  handleCancel,
  setSubmitting,
  dispatch,
  setChanged
) {
  try {
    const response = await axios.post(
      changeUserProfileImageUrl,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );

    if (response.status === 200 && response?.data?.isSuccess) {
      dispatch(setUser(response?.data?.userData));
      successToast(response?.data?.message);
      resetForm();
      handleCancel();
      setChanged((prev) => !prev);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to get otp to verify user mobile number
export async function getOtp(mobile, setSubmitting, setShowOtp) {
  try {
    const response = await axios.get(getOtpUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
        mobile,
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setShowOtp(true);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to update user mobile number
export async function updateMobileNumber(
  data,
  number,
  setSubmitting,
  setChanged,
  setShowOtp
) {
  try {
    const response = await axios.put(
      updateMobileNumberUrl,
      { ...data, mobile: number },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChanged((prev) => !prev);
      setShowOtp(false);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to get otp in email
export async function getEmailOtp(email, setShowOtpModal, setSubmitting) {
  try {
    const response = await axios.get(getEmailOtpUrl, {
      headers: {
        "Content-Type": "application/json",
        email,
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setShowOtpModal(true);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to register user with email after checking otp
export async function registerUserWithEmail(
  data,
  otp,
  setShowOtp,
  navigate,
  setSubmitting
) {
  try {
    const response = await axios.post(
      registerUserWithEmailUrl,
      { ...data, otp },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setShowOtp(false);
      navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to check and get otp for email to forget password
export async function checkEmailAndGetOtp(data, updateState, setSubmitting) {
  try {
    const response = await axios.get(checkEmailAndGetOtpUrl, {
      headers: {
        "Content-Type": "application/json",
        ...data,
      },
    });
    if (response.status === 200 && response.data.isSuccess) {
      successToast(response?.data?.message);
      updateState(true);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to verify otp in mail for forget password
export async function verifyEmailOtp(otp, email, navigate, setSubmitting) {
  try {
    const response = await axios.get(verifyEmailOtpUrl, {
      headers: {
        "Content-Type": "application/json",
        otp,
        email,
      },
    });
    if (response.status === 200 && response.data.isSuccess) {
      successToast(response?.data?.message);
      navigate("/changePassword", { state: { email: email } });
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to change password with email
export async function changePasswordWithEmail(
  data,
  email,
  navigate,
  setSubmitting
) {
  try {
    const response = await axios.post(
      changePasswordWithEmailUrl,
      { password: data?.newPass, email },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status === 200 && response.data?.isSuccess) {
      successToast(response?.data?.message);
      navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to get otp for change password with mobile number
export async function checkMobileAndGetOtp(data, updateState, setSubmitting) {
  try {
    const response = await axios.get(checkMobileAndGetOtpUrl, {
      headers: {
        "Content-Type": "application/json",
        ...data,
      },
    });
    if (response.status === 200 && response.data.isSuccess) {
      successToast(response?.data?.message);
      updateState(true);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to verify mobile otp to change password
export async function verifyMobileOtp(otp, mobile, navigate, setSubmitting) {
  try {
    const response = await axios.get(verifyMobileOtpUrl, {
      headers: {
        "Content-Type": "application/json",
        otp,
        mobile,
      },
    });
    if (response.status === 200 && response.data.isSuccess) {
      successToast(response?.data?.message);
      navigate("/changePassword", { state: { mobile: mobile } });
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to change password with mobile number
export async function changePasswordWithMobile(
  data,
  mobile,
  navigate,
  setSubmitting
) {
  try {
    const response = await axios.post(
      changePasswordWithMobileUrl,
      {
        password: data?.newPass,
        mobile,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 && response.data?.isSuccess) {
      successToast(response?.data?.message);
      navigate("/login");
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to get all coupons of user
export async function getUserCoupons(id, setCouponData) {
  try {
    const response = await axios.get(getUserCouponsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id,
      },
    });
    if (response.status === 200 && response.data?.isSuccess) {
      setCouponData(response?.data?.data?.coupons);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// function to make the coupon for auction
export async function makeCouponForAuction(id, setSelected) {
  try {
    const response = await axios.get(makeCouponForAuctionUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id,
      },
    });
    if (response.status === 200 && response.data?.isSuccess) {
      successToast(response?.data?.message);
      setSelected("auction");
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// Function to get the coupons by the user
export async function getUserAuctionCoupons(userId, setAuctionData) {
  try {
    const response = await axios.get(getUserAuctionCouponsUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id: userId,
      },
    });
    if (response.status === 200 && response.data?.isSuccess) {
      setAuctionData(response.data?.auctionData);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// function to start the auction by user with price and other details
export async function startAuction(
  userId,
  couponId,
  price,
  setChanged,
  resetForm
) {
  try {
    const response = await axios.put(
      startAuctionUrl,
      {
        userId,
        couponId,
        price,
        date: new Date().toLocaleString(),
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response.data?.isSuccess) {
      setChanged((prev) => !prev);
      resetForm();
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// functions to fetch all Auctions available
export async function getAllAuctions(userId, setAuctionData) {
  try {
    const response = await axios.get(getAllAuctionUrls, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        userId,
      },
    });
    if (response.status === 200 && response.data?.isSuccess) {
      setAuctionData(response?.data?.auctionData);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// function to change the user name
export async function changeUserName(
  name,
  setChanged,
  setSubmitting,
  resetForm
) {
  try {
    const response = await axios.get(changeUserNameUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        name: name,
      },
    });
    if (response.status === 200 && response.data?.isSuccess) {
      successToast(response?.data?.message);
      setChanged((prev) => !prev);
      resetForm();
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to update the user details
export async function updateUserDetails(data, setSubmitting, setChanged) {
  try {
    const response = await axios.post(updateUserDetailsUrl, data, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 && response.data?.isSuccess) {
      successToast(response?.data?.message);
      setChanged((prev) => !prev);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  } finally {
    setSubmitting(false);
  }
}

// function to participate in the auction my mobile user
export async function auctionParticipation(
  userId,
  couponId,
  price,
  setChanged,
  resetForm,
  handleCancel
) {
  try {
    const response = await axios.get(auctionParticipationUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        userId,
        couponId,
        price,
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      resetForm();
      setChanged((prev) => !prev);
      handleCancel();
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}

// function for getting the coupon for auction
export async function couponForAuction(id, setCouponData) {
  try {
    const response = await axios.get(couponForAuctionUrl, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        id,
      },
    });
    if (response.status === 200 && response.data?.isSuccess) {
      setCouponData(response?.data?.data);
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}


// function to get the winners list of the lucky draw
export async function getWinners(setWinners){
  try {
    const response =await axios.get(getWinnersUrl,{headers:{
      "Content-Type": "application/json",
    }})
    if (response.status === 200 && response.data?.isSuccess) {
      setWinners(response?.data?.winners)
    }
  } catch (error) {
    if (error.response) {
      const { data } = error.response;
      if (data.errors && Array.isArray(data.errors)) {
        // Show each validation error
        data.errors.forEach((err) => errorToast(err.msg));
      } else {
        errorToast(error.response.data.message || "Something went wrong!");
      }
      console.error("Server Error:", error.response.data);
    } else if (error.request) {
      errorToast("No response from server. Please try again later.");
      console.error("Request Error:", error.request);
    } else {
      errorToast("An unexpected error occurred.");
      console.error("Unexpected Error:", error.message);
    }
  }
}