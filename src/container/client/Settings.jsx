import { useFormik } from "formik";
import * as yup from "yup";
import { getOtp } from "../../services/userApiServices";
import { useState } from "react";
import OtpModal from "./OtpModal";

export default function Settings(Props) {
  const { setChanged, userData } = Props;
  const [showOtp, setShowOtp] = useState(false);

  const validationSchema = yup.object().shape({
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setSubmitting,
    isSubmitting,
  } = useFormik({
    initialValues: {
      mobileNumber: "",
    },
    validationSchema,
    onSubmit: (values) => {
      getOtp(values.mobileNumber, setSubmitting, setShowOtp);
    },
  });

  if (showOtp) {
    return (
      <OtpModal
        number={values?.mobileNumber}
        setChanged={setChanged}
        setShowOtp={setShowOtp}
        otpType="mobileChange"
      />
    );
  }

  return (
    <div className="w-full h-fit md:px-28 p-10">
      <div className="w-full h-full">
        <p className="text-xl">Settings :-</p>
        <div className="flex justify-between items-center py-5">
          <div className="w-full h-fit md:w-1/2 ">
            <div className="space-y-5">
              <label htmlFor="mobileNumber" className="text-sm">
                Update mobile number
              </label>
              <input
                type="number"
                name="mobileNumber"
                id="mobileNumber"
                value={values.mobileNumber}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder={userData?.mobile || ""}
                className="w-full px-3 py-2  text-white text-sm outline-none rounded-lg border border-admin-active-color"
              />
            </div>
            {errors.mobileNumber && touched.mobileNumber && (
              <p className="text-xs text-red-500">{errors.mobileNumber}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <button
              type="button"
              disabled={isSubmitting}
              className={`px-5 py-1 outline-none text-white bg-admin-active-color rounded-lg mt-5 text-sm cursor-pointer ${
                isSubmitting && "opacity-50"
              } `}
              onClick={handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
