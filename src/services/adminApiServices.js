import axios from "axios";
import {
  adminLoginUrl,
  adminSignupUrl,
  postCardImageUrl,
  getCardImagesUrl,
  deleteCardImageUrl,
  postCardDetailsUrl,
  getCardsUrl,
  deleteCardDetailsUrl,
  activateCardUrl,
  postArtDetailsUrl,
  getArtsUrl,
  editArtDetailsUrl,
  editArtWithImageUrl,
  deleteArtDetailsUrl,
  changeArtStatusUrl,
  editCardDetailsUrl,
  getUsersUrl,
  getDashboardDataUrl,
  inactivateCardUrl,
} from "./urls";
import {
  errorToast,
  successToast,
} from "../components/Notification/Notification";

const token = localStorage.getItem("prizeAdminTkn");

// Admin sign up function
export async function AdminSignUp(data, setSubmitting) {
  try {
    await axios
      .post(adminSignupUrl, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 200 && response.data.isSuccess) {
          // console.log(response.data.message);
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

// Admin Login function
export async function AdminLogin(data, navigate, setSubmitting) {
  try {
    await axios
      .get(adminLoginUrl, {
        headers: {
          ...data,
          "Content-Type": "application/json",
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

// Card Image upload function
export async function UploadCardImage(
  cardImageData,
  setSubmitting,
  openModal,
  setImageUploaded,
  resetForm
) {
  try {
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

// function to get the images of the card
export async function getCardImages(updateState) {
  try {
    await axios
      .get(getCardImagesUrl, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
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
          "Content-Type": "application/json",
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

// function for posting card details
export async function postCard(cardData, setSubmitting, navigate) {
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
      successToast(
        `${response?.data?.message}, don't forget to activate card!!`
      );
      navigate("/admin/cards");
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

// function to get cards from server
export async function getCards(updateState) {
  try {
    const response = await axios.get(getCardsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response?.status === 200 && response?.data?.isSuccess) {
      updateState(response?.data?.data);
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
  }
}

// function to delete card details
export async function deleteCardDetails(id, setChanged) {
  try {
    const response = await axios.delete(deleteCardDetailsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
        cardId: id,
      },
    });

    if (response?.status === 200 && response?.data?.isSuccess) {
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
  }
}

// function to change the card status to active
export async function activateCard(id, setChanged) {
  try {
    const response = await axios.put(
      activateCardUrl,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          cardId: id,
        },
      }
    );
    if (response?.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChanged((prev) => !prev);
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
  }
}

// function to inactive card
export async function inActiveCard(id, setChanged) {
  try {
    const response = await axios.put(
      inactivateCardUrl,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          cardId: id,
        },
      }
    );
    if (response?.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChanged((prev) => !prev);
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
  }
}

// function for set art details
export async function postArtDetails(
  data,
  setSubmitting,
  setChange,
  handleCancel
) {
  try {
    const response = await axios.post(
      postArtDetailsUrl,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      }
    );
    if (response?.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChange((prev) => !prev);
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
  } finally {
    setSubmitting(false);
  }
}

// function for fetching arts
export async function getArts(updateState) {
  try {
    const response = await axios.get(getArtsUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      updateState(response?.data?.data);
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
  }
}

// function for edit art details
export async function editArtDetails(
  data,
  id,
  setChange,
  handleCancel,
  setSubmitting
) {
  try {
    const response = await axios.patch(
      editArtDetailsUrl,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          artId: id,
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChange((prev) => !prev);
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
  } finally {
    setSubmitting(false);
  }
}

export async function editArtWithImage(
  data,
  id,
  setChange,
  handleCancel,
  setSubmitting
) {
  try {
    const response = await axios.patch(
      editArtWithImageUrl,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
          artId: id,
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChange((prev) => !prev);
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
  } finally {
    setSubmitting(false);
  }
}

export async function deleteArtDetails(id, setChange) {
  try {
    const response = await axios.put(
      deleteArtDetailsUrl,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          artId: id,
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChange((prev) => !prev);
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

export async function changeArtStatus(id, setChange) {
  try {
    const response = await axios.put(
      changeArtStatusUrl,
      {
        id,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      setChange((prev) => !prev);
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

// function to edit card details
export async function editCardDetails(
  data,
  cardId,
  closeEditModal,
  setChanged,
  setSubmitting
) {
  try {
    const response = await axios.put(
      editCardDetailsUrl,
      { ...data },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          cardId,
        },
      }
    );
    if (response.status === 200 && response?.data?.isSuccess) {
      successToast(response?.data?.message);
      closeEditModal();
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

// function to fetch full user data
export async function getUsers(updateState) {
  try {
    const response = await axios.get(getUsersUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (response?.status === 200 && response?.data?.isSuccess) {
      updateState(response?.data?.userData);
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

// function to get dashboard data
export async function getDashboardData(
  setUserData,
  setUserArtData,
  setDashData
) {
  try {
    const response = await axios.get(getDashboardDataUrl, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (response.status === 200 && response?.data?.isSuccess) {
      setUserData(response?.data?.userData);
      setUserArtData(response?.data?.userArtData);
      setDashData(response?.data?.dashData);
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
