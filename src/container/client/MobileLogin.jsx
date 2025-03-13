import LoginInput from "../../components/admin/LoginInput";
import { useFormik } from "formik";
import { useState } from "react";
import * as yup from "yup";
import { IoArrowForwardOutline } from "react-icons/io5";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";
import { userLoginWithMobile } from "../../services/userApiServices";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function MobileLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);

  const validationSchema = yup.object().shape({
    mobile: yup
      .string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),

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
      mobile: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      userLoginWithMobile(values, navigate, setSubmitting, dispatch);
    },
  });

  return (
    <form className="space-y-3  w-full h-fit" onSubmit={handleSubmit}>
      <div className="space-y-2">
        <p className="text-gray-400 text-sm"> Mobile number</p>
        <LoginInput
          type="number"
          name="mobile"
          id="mobile"
          handleBlur={handleBlur}
          handleChange={handleChange}
          value={values.mobile}
        />
        {errors.mobile && touched.mobile && (
          <p className="text-xs text-red-500">{errors.mobile}</p>
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
      <div className="flex">
        <p
          className="text-xs text-blue-500 cursor-pointer"
          onClick={() =>
            navigate("/forgot", {
              state: { type: "mobile" }, 
            })
          }
        >
          Forgot password?
        </p>
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
  );
}
