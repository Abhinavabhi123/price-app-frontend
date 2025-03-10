import axios from "axios";
import {
  errorToast,
  successToast,
} from "../components/Notification/Notification";
import {
  changeUserProfileImageUrl,
  checkAnswerUrl,
  getGamesAndArtsUrl,
  getOtpUrl,
  getUserDetailsUrl,
  googleAuthUrl,
  purchaseArtUrl,
  registerUserMobileUrl,
  updateMobileNumberUrl,
  userLoginUrl,
  userLoginWithMobileUrl,
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
          dispatch(setUser(response?.data));
          successToast(response?.data?.message);
          navigate(-1);
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
      dispatch(setUser(response?.data));
      successToast(response?.data?.message);
      navigate(-1);
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
          navigate(-1);
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
export async function getUserDetails(id, updateState, setLoading) {
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
      setLoading(false);
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
export async function getGamesAndArts(setLoading, setCards, setArts) {
  try {
    const response = await axios.get(getGamesAndArtsUrl, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      setLoading(false);
      setCards(response?.data?.cardData);
      setArts(
        response?.data?.artData.map((item) => ({
          ...item,
          isAnswered: false,
          quantity: 0,
        }))
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
  }
}

// function to check the anser before buying art
export async function checkAnswer(answer, id, setArtData, setSubmitting) {
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
          item._id === id ? { ...item, isAnswered: true } : item
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
export async function userRegisterWithMobile(data, navigate, setSubmitting) {
  try {
    const response = await axios.post(
      registerUserMobileUrl,
      { ...data },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
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

// Function to user can  purchase art

export async function purchaseArt(artData, setChanged, setPurchasing) {
  try {
    const response = await axios.get(purchaseArtUrl, {
      headers: {
        "Content-Type": "application/json",
        id: artData?._id,
        quantity: artData?.quantity,
        Authorization: `Bearer ${token}`,
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
      setShowOtp(false)
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
