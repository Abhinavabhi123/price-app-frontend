import axios from "axios";
import {
  adminLoginUrl,
  adminSignupUrl,
  postCardImageUrl,
  getCardImagesUrl,
  deleteCardImageUrl,
  postCardDetailsUrl,
} from "./urls";
import {
  errorToast,
  successToast,
} from "../components/Notification/Notification";

const token = localStorage.getItem("prizeAdminTkn");

// Admin sign up function
export async function AdminSignUp(data) {
  try {
    await axios.post(adminSignupUrl, data).then((response) => {
      if (response.status === 200 && response.data.isSuccess) {
        console.log(response.data.message);
      }
    });
  } catch (error) {
    if (error.response) {
      errorToast(error.response.data.message || "Something went wrong!");
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

// Admin Login function
export async function AdminLogin(data, navigate, setSubmitting) {
  try {
    await axios
      .get(adminLoginUrl, {
        headers: {
          data: JSON.stringify(data),
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.isSuccess) {
          successToast(response?.data?.message);
          localStorage.setItem("prizeAdminTkn", response?.data?.token);
          navigate("/admin/dashboard");
        }
      });
  } catch (error) {
    if (error.response) {
      errorToast(error.response.data.message || "Something went wrong!");
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

// Card Image upload function
export async function UploadCardImage(
  cardImageData,
  setSubmitting,
  openModal,
  setImageUploaded,
  resetForm
) {
  try {
    const token = localStorage.getItem("prizeAdminTkn");
    if (!token) {
      throw new Error("Invalid token");
    }
    const response = await axios.post(
      postCardImageUrl,
      { ...cardImageData },
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      openModal();
      setImageUploaded((prev) => !prev);
      resetForm();
    }
  } catch (error) {
    if (error.response) {
      errorToast(error.response.data.message || "Something went wrong!");
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

// function to get the images of the card
export async function getCardImages(updateState) {
  try {
    await axios
      .get(getCardImagesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response?.status === 200 && response?.data?.isSuccess) {
          updateState(response?.data?.data);
        }
      });
  } catch (error) {
    if (error.response) {
      errorToast(error.response.data.message || "Something went wrong!");
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

// function for delete card Image
export async function deleteCardImage(id, setImageUploaded = () => {}) {
  try {
    await axios
      .delete(deleteCardImageUrl, {
        headers: {
          id,
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        if (response.status === 200 && response?.data?.isSuccess) {
          successToast(response?.data?.message);
          setImageUploaded((prev) => !prev);
        }
      });
  } catch (error) {
    if (error.response) {
      errorToast(error.response.data.message || "Something went wrong!");
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

// function for posting card details
export async function postCard(cardData, setSubmitting) {
  try {
    const response = await axios.post(
      postCardDetailsUrl,
      { ...cardData },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response?.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
    }
  } catch (error) {
    if (error.response) {
      errorToast(error.response.data.message || "Something went wrong!");
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
