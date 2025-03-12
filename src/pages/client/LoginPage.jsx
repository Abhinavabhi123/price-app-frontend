import { useState } from "react";
import { MdKeyboardArrowLeft, MdOutlineEmail } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { GoogleAuthentication } from "../../services/userApiServices";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { errorToast } from "../../components/Notification/Notification";
import { useDispatch } from "react-redux";
import { FaPhone } from "react-icons/fa6";
import EmailLogin from "../../container/client/EmailLogin";
import MobileLogin from "../../container/client/MobileLogin";

export default function LoginPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isEmail, setIsEmail] = useState(false);

  const clientId = import.meta.env.VITE_AUTH_CLIENT_ID;

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
    errorToast("Login with google failed, Please try after some time!");
  };

  return (
    <div className="w-full h-dvh bg-primary-color">
      <div className="p-5 w-full h-[10%]">
        <button
          className="text-gray-300 flex justify-center items-center cursor-pointer"
          onClick={() => navigate("/home")}
        >
          <MdKeyboardArrowLeft size={20} />
          <p className="text-sm font-semibold">Home</p>
        </button>
      </div>
      <div className="w-full h-[90%] flex justify-center items-center">
        <div className="w-full md:w-1/3 h-[60%] bg-red-0 px-10 md:px-0 p-3">
          <p className="text-xl font-semibold text-white">Log in</p>
          <div className="flex py-5">
            <p className="text-white">{`Don't have an account? `}</p>
            <p
              onClick={() => navigate("/signUp")}
              className="text-blue-500 px-1 cursor-pointer"
            >
              {" "}
              Sign up.
            </p>
          </div>
          {isEmail ? <EmailLogin /> : <MobileLogin />}

          <div className="flex justify-center items-center gap-2 my-2">
            <div className="w-full h-[1px] bg-gray-400"></div>
            <span className="text-gray-400 text-sm">OR</span>
            <div className="w-full h-[1px] bg-gray-400"></div>
          </div>
          <div className="w-full flex flex-col md:flex-row gap-2">
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
            <div className="w-full h-10">
              {!isEmail ? (
                <button
                  className="flex w-full h-full  justify-center items-center cursor-pointer gap-2 bg-[#555658]/40 rounded-sm text-sm "
                  onClick={() => setIsEmail(true)}
                >
                  <MdOutlineEmail size={20} />
                  Login with Email
                </button>
              ) : (
                <button
                  className="flex w-full h-full  justify-center items-center cursor-pointer gap-2 bg-[#555658]/40 rounded-sm text-sm "
                  onClick={() => setIsEmail(false)}
                >
                  <FaPhone size={15} />
                  Login with Mobile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
