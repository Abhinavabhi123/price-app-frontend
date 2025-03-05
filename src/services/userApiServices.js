import axios from "axios";
import { errorToast, successToast } from "../components/Notification/Notification";
import { googleAuthUrl, userLoginUrl } from "./urls";
import { setUser } from "../utils/store/userSlice";

export async function userLogin(data, navigate, setSubmitting) {
  try {
    await axios
      .get(userLoginUrl, {
        headers: {
          ...data,
        },
      })
      .then((response) => {
        if (response?.status === 200 && response?.data?.isSuccess) {
          successToast(response?.data?.message)
          navigate(-1);
        }
      });
    setSubmitting(false);
  } catch (error) {
    setSubmitting(false);
    errorToast(error?.response?.data?.message)
    console.error(error);
  }
}

// Login and registration using google cloud service
export async function GoogleAuthentication(data, navigate,dispatch) {
  try {
    await axios
      .post(googleAuthUrl, {
        name:data?.name,
        email:data?.email,
        picture:data?.picture,
      })
      .then((response) => {
        if (response?.status === 200 && response?.data?.isSuccess) {        
          dispatch(setUser(response?.data));
          localStorage.setItem("PrizeUserTkn",response?.data?.token);
          navigate(-1);
        }
      });
  } catch (error) {
    console.error(error);
    errorToast(error?.response?.data?.message);
  }
}
