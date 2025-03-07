import axios from "axios";
import {
  errorToast,
  successToast,
} from "../components/Notification/Notification";
import {
  checkAnswerUrl,
  getGamesAndArtsUrl,
  getUserDetailsUrl,
  googleAuthUrl,
  userLoginUrl,
} from "./urls";
import { clearUser, setUser } from "../utils/store/userSlice";

const token = localStorage.getItem("PrizeUserTkn");

export async function userLogin(data, navigate, setSubmitting, dispatch) {
  try {
    await axios
      .get(userLoginUrl, {
        headers: {
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
      .post(googleAuthUrl, {
        name: data?.name,
        email: data?.email,
        picture: data?.picture,
      })
      .then((response) => {
        if (response?.status === 200 && response?.data?.isSuccess) {
          dispatch(setUser(response?.data));
          localStorage.setItem("PrizeUserTkn", response?.data?.token);
          navigate(-1);
        }
      });
  } catch (error) {
    console.error(error);
    errorToast(error?.response?.data?.message);
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
