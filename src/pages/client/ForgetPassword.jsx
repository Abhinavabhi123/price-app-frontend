import { useLocation, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import Header from "../../container/client/Header";
import {
  checkEmailAndGetOtp,
  checkMobileAndGetOtp,
} from "../../services/userApiServices";
import OtpModal from "../../container/client/OtpModal";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";

export default function ForgetPassword() {
  const navigate = useNavigate();
  const location = useLocation();
  const [state, setState] = useState("");
  const [showEmailOtpModal, setShowEmailOtpModal] = useState(false);
  const [showMobileOtpModal, setShowMobileOtpModal] = useState(false);

  useEffect(() => {
    if (location) {
      const { state } = location || {};
      if (state) {
        setState(location);
      }
    }
  }, [location]);

  const emailValidationSchema = Yup.object({
    email: Yup.string()
      .trim()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const emailFormik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: emailValidationSchema,
    onSubmit: (values) => {
      checkEmailAndGetOtp(
        values,
        setShowEmailOtpModal,
        emailFormik.setSubmitting
      );
    },
  });

  const mobileValidationSchema = Yup.object({
    mobile: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  const mobileFormik = useFormik({
    initialValues: {
      mobile: "",
    },
    validationSchema: mobileValidationSchema,
    onSubmit: (values) => {
      checkMobileAndGetOtp(
        values,
        setShowMobileOtpModal,
        mobileFormik.setSubmitting
      );
    },
  });
  if (showEmailOtpModal) {
    return (
      <OtpModal
        data={emailFormik.values}
        setShowOtp={showEmailOtpModal}
        otpType="forgetEmail"
        type="email"
      />
    );
  }
  if (showMobileOtpModal) {
    return (
      <OtpModal
        data={mobileFormik.values}
        setShowOtp={setShowMobileOtpModal}
        otpType="forgetMobile"
        type="mobile"
      />
    );
  }

  return (
    <div className="w-screen h-dvh bg-primary-color">
      <Header />
      <div className="px-5 md:px-20 py-6">
        <div
          className="w-fit h-fit relative cursor-pointer"
          onClick={() => navigate("/login")}
        >
          <MdKeyboardArrowLeft size={25} />
        </div>
      </div>
      <div className="w-full h-[90vh] flex justify-center items-center -mt-20 px-5 md:px-0">
        <div className="w-full md:w-[30%] h-fit min-h-60 p-4">
          <p className="text-2xl font-semibold">Reset Your password</p>
          <div className="mt-3">
            <p className="text-xs">
              Please enter your{" "}
              {state && state?.state?.type === "email" ? "email" : "mobile"} and
              we will send an otp code in next step to reset your password
            </p>
            {state && state?.state?.type === "email" ? (
              <div className="mt-3">
                <div>
                  <label htmlFor="email" className="text-xs text-gray-400">
                    Email address
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={emailFormik.handleChange}
                    onBlur={emailFormik.handleBlur}
                    value={emailFormik.values.email}
                    className="w-full outline-none py-2 px-4 rounded-full border border-white text-sm"
                  />
                  {emailFormik.errors.email && emailFormik.touched.email && (
                    <p className="text-xs text-red-500">
                      {emailFormik.errors.email}
                    </p>
                  )}
                </div>
                <div className="mt-10">
                  <button
                    disabled={emailFormik.isSubmitting}
                    onClick={emailFormik.handleSubmit}
                    className="px-4 py-2 rounded-full text-black bg-white w-full cursor-pointer text-sm font-semibold"
                  >
                    {emailFormik.isSubmitting ? (
                      <SubmissionLoading />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </div>
            ) : (
              <div className="mt-3">
                <div>
                  <label htmlFor="email" className="text-xs text-gray-400">
                    Mobile number
                  </label>
                  <input
                    type="number"
                    id="mobile"
                    name="mobile"
                    onChange={mobileFormik.handleChange}
                    onBlur={mobileFormik.handleBlur}
                    value={mobileFormik.values.mobile}
                    className="w-full outline-none py-2 px-4 rounded-full border border-white text-sm"
                  />
                  {mobileFormik.errors.mobile &&
                    mobileFormik.touched.mobile && (
                      <p className="text-xs text-red-500">
                        {mobileFormik.errors.mobile}
                      </p>
                    )}
                </div>
                <div className="mt-10">
                  <button
                    disabled={mobileFormik.isSubmitting}
                    onClick={mobileFormik.handleSubmit}
                    className="px-4 py-2 rounded-full text-black bg-white w-full cursor-pointer text-sm font-semibold"
                  >
                    {mobileFormik.isSubmitting ? (
                      <SubmissionLoading />
                    ) : (
                      "Continue"
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
