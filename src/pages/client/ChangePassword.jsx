import { useEffect, useState } from "react";
import Header from "../../container/client/Header";
import { useLocation, useNavigate } from "react-router-dom";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";
import {
  changePasswordWithEmail,
  changePasswordWithMobile,
} from "../../services/userApiServices";

export default function ChangePassword() {
  const [state, setState] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  useEffect(() => {
    if (location) {
      const { state } = location || {};
      if (state) {
        setState(location);
      }
    }
  }, [location]);

  const newPassHandleMouseDown = () => setShowNewPassword(true);
  const newPassHandleMouseUp = () => setShowNewPassword(false);
  const confPassHandleMouseDown = () => setShowConfPassword(true);
  const confPassHandleMouseUp = () => setShowConfPassword(false);

  const validationSchema = Yup.object({
    newPass: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .max(20, "Password cannot exceed 20 characters")
      .required("New password is required"),

    confPass: Yup.string()
      .oneOf([Yup.ref("newPass"), null], "Passwords must match")
      .required("Confirm password is required"),
  });

  console.log(state, "state");
  const {
    values,
    errors,
    handleChange,
    handleBlur,
    touched,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      newPass: "",
      confPass: "",
    },
    validationSchema,
    onSubmit: (values) => {
      if (state.state.email) {
        changePasswordWithEmail(
          values,
          state.state.email,
          navigate,
          setSubmitting
        );
      }
      if (state.state.mobile) {
        changePasswordWithMobile(
          values,
          state.state.mobile,
          navigate,
          setSubmitting
        );
      }
    },
  });

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
      <div className="w-full h-full md:h-[85%]  flex justify-center items-center -mt-10">
        <div className="w-full md:w-[40%] h-fit min-h-[50%]  p-2 px-5 md:px-0">
          <p className="text-2xl font-semibold">Create New Password</p>
          <p className="text-xs mt-3">
            Create your new password. If you forget it, then you have to do
            forgot password
          </p>
          <div className="mt-4 space-y-4">
            <div>
              <label htmlFor="newPass" className="text-xs text-gray-400">
                New Password
              </label>
              <input
                type={showNewPassword ? "text" : "password"}
                name="newPass"
                id="newPass"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.newPass}
                onMouseEnter={newPassHandleMouseDown}
                onTouchStart={newPassHandleMouseDown}
                onMouseLeave={newPassHandleMouseUp}
                onTouchEnd={newPassHandleMouseUp}
                className="w-full px-5 py-2 rounded-full outline-none border border-white"
              />
              {errors.newPass && touched.newPass && (
                <p className="text-xs text-red-500">{errors.newPass}</p>
              )}
            </div>
            <div>
              <label htmlFor="confPass" className="text-xs text-gray-400">
                Confirm Password
              </label>
              <input
                type={showConfPassword ? "text" : "password"}
                name="confPass"
                id="confPass"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values?.confPass}
                onMouseEnter={confPassHandleMouseDown}
                onTouchStart={confPassHandleMouseDown}
                onMouseLeave={confPassHandleMouseUp}
                onTouchEnd={confPassHandleMouseUp}
                className="w-full px-5 py-2 rounded-full outline-none border border-white"
              />
              {errors.confPass && touched.confPass && (
                <p className="text-xs text-red-500">{errors.confPass}</p>
              )}
            </div>
            <div>
              <button
                disabled={isSubmitting}
                onClick={handleSubmit}
                className="px-4 py-2 rounded-full mt-3 w-full bg-white text-black cursor-pointer"
              >
                {isSubmitting ? <SubmissionLoading /> : "Continue"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
