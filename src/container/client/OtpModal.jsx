import { Modal } from "antd";
import { useFormik } from "formik";
import OtpInput from "react-otp-input";
import * as yup from "yup";
import {
  registerUserWithEmail,
  updateMobileNumber,
  userRegisterWithMobile,
  verifyEmailOtp,
  verifyMobileOtp,
} from "../../services/userApiServices.js";
import { useNavigate } from "react-router-dom";

export default function OtpModal(Props) {
  const {
    number,
    setChanged,
    setShowOtp,
    otpType = "mobileChange",
    data,
    type = "mobile",
  } = Props;
  const navigate = useNavigate();

  const otpValidationSchema = yup.object().shape({
    otp: yup
      .string()
      .matches(
        /^[0-9]{4}$/,
        "OTP must be exactly 4 digits and contain only numbers"
      )
      .required("OTP is required"),
  });

  const {
    values,
    errors,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: otpValidationSchema,
    onSubmit: (values) => {
      if (otpType === "mobileChange") {
        updateMobileNumber(
          values,
          number,
          setSubmitting,
          setChanged,
          setShowOtp
        );
      } else if (otpType === "emailOtp") {
        registerUserWithEmail(
          data,
          values.otp,
          setShowOtp,
          navigate,
          setSubmitting
        );
      } else if (otpType === "mobileRegisterOtp") {
        userRegisterWithMobile(
          data,
          values.otp,
          navigate,
          setSubmitting,
          setShowOtp
        );
      } else if (otpType === "forgetEmail") {
        verifyEmailOtp(values.otp, data?.email, navigate, setSubmitting);
      } else if (otpType === "forgetMobile") {
        verifyMobileOtp(values.otp, data.mobile, navigate, setSubmitting);
      }
    },
  });

  return (
    <Modal
      title="Verify OTP"
      open={true}
      footer={false}
      closable={false}
      centered
    >
      <div className="w-full h-full flex flex-col gap-5">
        <p className="text-black text-sm">
          Please enter the otp send to your {type} {data?.number || data?.email}
          {number}
        </p>
        <div className="flex flex-col justify-center items-center gap-3">
          <OtpInput
            numInputs={4}
            value={values?.otp}
            shouldAutoFocus
            inputType="number"
            onChange={(otp) => setFieldValue("otp", otp)}
            renderSeparator={<span>-</span>}
            renderInput={(props) => <input {...props} />}
            inputStyle={{
              width: "40px",
              height: "40px",
              margin: "0 5px",
              fontSize: "16px",
              borderRadius: "4px",
              border: "1px solid #5046bb",
              textAlign: "center",
            }}
          />

          {errors.otp && <p className="text-xs text-red-500">{errors.otp}</p>}
        </div>
        <div className="flex justify-center items-center">
          <button
            disabled={isSubmitting}
            type="button"
            className={`px-3 py-1 rounded-lg text-white bg-admin-active-color outline-none cursor-pointer ${
              isSubmitting && "opacity-50"
            } `}
            onClick={handleSubmit}
          >
            Verify
          </button>
        </div>
      </div>
    </Modal>
  );
}
