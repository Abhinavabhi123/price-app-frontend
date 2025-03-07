import { useFormik } from "formik";
import LoginInput from "../../components/admin/LoginInput";
import { IoArrowForwardOutline } from "react-icons/io5";
import * as yup from "yup";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";
import { AdminLogin } from "../../services/adminApiServices";

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleMouseDown = () => setShowPassword(true);
  const handleMouseUp = () => setShowPassword(false);

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
      AdminLogin(values, navigate, setSubmitting);
      // AdminSignUp(values,setSubmitting)
    },
  });

  return (
    <div className="w-screen h-dvh bg-primary-color flex justify-center items-center overflow-x-hidden">
      <div className="w-[80%] md:w-[40%] min:h-[50%] h-fit rounded-xl ">
        <p className="text-white my-10 text-2xl w-[40%] font-semibold">
          Login to Admin Dashboard
        </p>
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-2">
            <p className="text-gray-400 text-sm font-semibold">Email</p>
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
            <p className="text-gray-400 text-sm font-semibold">Password</p>
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
              className="w-full h-fit text-black rounded-md bg-white flex justify-center items-center gap-2 py-2 mt-10 font-semibold cursor-pointer"
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
      </div>
    </div>
  );
}
