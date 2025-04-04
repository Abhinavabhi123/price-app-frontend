import { useFormik } from "formik";
import * as yup from "yup";
import { changeUserName, getOtp } from "../../services/userApiServices";
import { useState } from "react";
import OtpModal from "./OtpModal";
import ProfileUpdate from "./ProfileUpdate";

export default function Settings(Props) {
  const { setChanged, userData } = Props;
  const [showOtp, setShowOtp] = useState(false);

  const validationSchema = yup.object().shape({
    mobileNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
  });
  const nameValidationSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, "Name can only contain letters and spaces")
      .min(2, "Name must be at least 2 characters long")
      .max(50, "Name cannot exceed 50 characters")
      .required("Name is required"),
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

  const nameFormik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: nameValidationSchema,
    onSubmit: (values, { setSubmitting, resetForm }) => {
      changeUserName(values.name, setChanged, setSubmitting, resetForm);
    },
  });

  if (showOtp) {
    return (
      <OtpModal
        number={values?.mobileNumber}
        setChanged={setChanged}
        setShowOtp={setShowOtp}
        otpType="mobileChange"
        type="mobile"
      />
    );
  }

  return (
    <div className="w-full h-fit md:px-28 p-10">
      <div className="w-full h-full">
        <p className="text-xl">Settings :-</p>
        <ProfileUpdate setChanged={setChanged} userData={userData}/>
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
        <div className="flex justify-between items-center py-5">
          <div className="w-full h-fit md:w-1/2 ">
            <div className="space-y-5">
              <label htmlFor="mobileNumber" className="text-sm">
                Update user name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                value={nameFormik.values.name}
                onChange={nameFormik.handleChange}
                onBlur={nameFormik.handleBlur}
                placeholder={userData?.name || ""}
                className="w-full px-3 py-2  text-white text-sm outline-none rounded-lg border border-admin-active-color"
              />
            </div>
            {nameFormik.errors.name && nameFormik.touched.name && (
              <p className="text-xs text-red-500">{nameFormik.errors.name}</p>
            )}
          </div>
          <div className="w-full md:w-1/2 flex justify-center items-center">
            <button
              type="button"
              disabled={nameFormik.isSubmitting}
              className={`px-5 py-1 outline-none text-white bg-admin-active-color rounded-lg mt-5 text-sm cursor-pointer ${
                nameFormik.isSubmitting && "opacity-50"
              } `}
              onClick={nameFormik.handleSubmit}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
