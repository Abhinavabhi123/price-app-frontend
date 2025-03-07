import { MdKeyboardArrowLeft } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import LoginInput from "../../components/admin/LoginInput";
import { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { IoArrowForwardOutline } from "react-icons/io5";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";
import {
  GoogleAuthentication,
  userLogin,
} from "../../services/userApiServices";

import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { errorToast } from "../../components/Notification/Notification";
import { useDispatch } from "react-redux";

export default function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);
  const dispatch = useDispatch();

  const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),

    password: yup
      .string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const {
    values,
    touched,
    handleChange,
    handleBlur,
    errors,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      console.log(values);
      userLogin(values, navigate, setSubmitting, dispatch);
    },
  });

  // function for success google authentication
  const handleSuccess = (response) => {
    const token = response.credential;
    const user = jwtDecode(token);
    if (user?.email_verified) {
      GoogleAuthentication(user, navigate, dispatch);
    } else {
      errorToast("Google authentication failed !!");
    }
  };

  // function for error for google authentication
  const handleError = () => {
    errorToast("Login failed Please try after some time!");
  };

  return (
    <div className="w-full h-dvh bg-primary-color">
      <div className="p-5 w-full h-[10%]">
        <button className="text-gray-300 flex justify-center items-center cursor-pointer">
          <MdKeyboardArrowLeft size={20} onClick={() => navigate("/home")} />
          <p className="text-sm font-semibold">Home</p>
        </button>
      </div>
      <div className="w-full h-[90%] flex justify-center items-center">
        <div className="w-full md:w-1/3 h-[60%] bg-red-0 px-10 md:px-0 p-3">
          <p className="text-xl font-semibold text-white">Log in</p>
          <div className="flex py-5">
            <p className="text-white">{`Don't have an account? `}</p>
            <p
              onClick={() => navigate("/signup")}
              className="text-blue-500 px-1 cursor-pointer"
            >
              {" "}
              Sign up.
            </p>
          </div>

          <form className="space-y-3  w-full h-fit" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Email</p>
              <LoginInput
                type="text"
                name="email"
                id="email"
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.email}
              />
              {errors.email && touched.email && (
                <p className="text-xs text-red-500">{errors.email}</p>
              )}
            </div>
            <div className="space-y-2">
              <p className="text-gray-400 text-sm">Password</p>
              <LoginInput
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.password}
                showPassword={handleMouseDown}
                hidePassword={handleMouseUp}
              />
              {errors.password && touched.password && (
                <p className="text-xs text-red-500">{errors.password}</p>
              )}
            </div>
            {!isSubmitting ? (
              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full h-fit rounded-md bg-white text-black flex justify-center items-center gap-2 py-2 mt-10 font-semibold cursor-pointer"
              >
                Continue
                <IoArrowForwardOutline size={20} />
              </button>
            ) : (
              <div className="w-full h-10 rounded-md bg-white flex justify-center items-center gap-2 py-2 mt-10">
                <SubmissionLoading />
              </div>
            )}
          </form>

          {/* <div className="w-full"> */}
          <div className="flex justify-center items-center gap-2 my-2">
            <div className="w-full h-[1px] bg-gray-400"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="w-full h-[1px] bg-gray-400"></div>
          </div>
          <GoogleOAuthProvider clientId={clientId}>
            <div className="flex w-full justify-center items-center">
              <div className="w-full">
                {" "}
                {/* Adjust the scale value as needed */}
                <GoogleLogin
                  onSuccess={handleSuccess}
                  onError={handleError}
                  theme="filled_black"
                />
              </div>
            </div>
          </GoogleOAuthProvider>
          {/* </div> */}
        </div>
      </div>
    </div>
  );
}
