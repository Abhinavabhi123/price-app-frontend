import { useFormik } from "formik";
import * as yup from "yup";
import { userLoginWithEmail } from "../../services/userApiServices";
import { useNavigate } from "react-router-dom";
import LoginInput from "../../components/admin/LoginInput";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { IoArrowForwardOutline } from "react-icons/io5";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";

export default function EmailLogin() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);

  const validationSchema = yup.object().shape({
    email: yup
      .string()
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        "Invalid email format"
      )
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
      userLoginWithEmail(values, navigate, setSubmitting, dispatch);
    },
  });

  return (
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
  );
}
