import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { updateUserDetails } from "../../services/userApiServices";
import { useEffect, useState } from "react";
import { IoLocationSharp } from "react-icons/io5";

export default function ProfileUpdate(Props) {
  const { setChanged, userData } = Props;
  const navigate = useNavigate();
  const [gettingLocation, setGettingLocation] = useState(false);

  const validationSchema = Yup.object({
    location: Yup.string()
      .min(2, "Location must be at least 2 characters")
      .required("Location is required"),
    age: Yup.number()
      .typeError("Age must be a number")
      .required("Age is required")
      .integer("Age must be an integer")
      .min(1, "Age must be at least 1")
      .max(99, "Age must be less than 100"),
    gender: Yup.string()
      .oneOf(["male", "female", "others"], "Select a valid gender")
      .required("Gender is required"),
  });
  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
    resetForm,
    isSubmitting,
  } = useFormik({
    initialValues: {
      location: "",
      age: "",
      gender: "",
    },
    validationSchema,
    onSubmit: (values, { setSubmitting }) => {
      const token = localStorage.getItem("PrizeUserTkn");
      if (token) {
        const id = jwtDecode(token).id;
        if (id) {
          values.id = id;
          updateUserDetails(values, setSubmitting, setChanged);
        }
      } else {
        navigate("/login");
      }
    },
  });

  useEffect(() => {
    setFieldValue("location", userData?.location || "");
    setFieldValue("age", userData?.age || "");
    setFieldValue("gender", userData?.gender || "");
  }, [setFieldValue, userData?.age, userData?.gender, userData?.location]);

  //   getting user location using location API
  function getUserLocation() {
    if ("geolocation" in navigator) {
        setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
          );
          const data = await res.json();
          setGettingLocation(false);
          setFieldValue(
            "location",
            `${data?.address?.county},${data?.address?.state_district},${data?.address?.state},${data?.address?.country}`
          );
        },
        (error) => {
          console.error("Error getting location:", error.message);
        }
      );
    } else {
      console.log("Geolocation is not supported by this browser.");
    }
  }

  return (
    <div className="w-full min-h-28 py-3 text-sm">
      <p className="text-sm italic">Update Profile</p>
      <form
        className="py-3 space-y-3"
        onSubmit={handleSubmit}
        onReset={resetForm}
      >
        <div>
          <label htmlFor="location" className="text-xs">
            Location
          </label>
          <div>
            <div className="flex">
              <input
                type="text"
                name="location"
                id="location"
                value={values.location}
                onChange={handleChange}
                onBlur={handleBlur}
                className="w-1/2 px-3 py-2 outline-none rounded-lg border border-admin-active-color"
              />
              <button type="button" className="p-2 relative">
                <IoLocationSharp
                  size={20}
                  className="cursor-pointer"
                  onClick={getUserLocation}
                />
                {gettingLocation && (
                  <span className="location_loader absolute right-2 bottom-0"></span>
                )}
              </button>
            </div>
            {errors.location && touched.location && (
              <p className="text-xs text-red-500">{errors.location}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="age" className="text-xs">
            Age
          </label>
          <div>
            <input
              type="number"
              name="age"
              id="age"
              value={values.age}
              onChange={handleChange}
              onBlur={handleBlur}
              className="w-1/2 px-3 py-2 outline-none rounded-lg border border-admin-active-color"
            />
            {errors.age && touched.age && (
              <p className="text-xs text-red-500">{errors.age}</p>
            )}
          </div>
        </div>
        <div>
          <label htmlFor="gender" className="text-xs">
            Gender
          </label>
          <div>
            <div className="w-1/2  border border-admin-active-color h-10 px-3 rounded-lg">
              <select
                id="gender"
                value={values.gender}
                onChange={(e) => {
                  setFieldValue("gender", e.target.value);
                }}
                className="w-full h-full text-sm outline-none cursor-pointer"
              >
                <option hidden className="text-white bg-black">
                  Select
                </option>
                <option value="male" className="text-white bg-black">
                  Male
                </option>
                <option value="female" className="text-white bg-black">
                  Female
                </option>
                <option value="others" className="text-white bg-black">
                  Others
                </option>
              </select>
              {errors.gender && touched.gender && (
                <p className="text-xs text-red-500">{errors.gender}</p>
              )}
            </div>
          </div>
        </div>
        <div className="w-1/2 flex justify-center items-center gap-4">
          <button
            type="reset"
            disabled={isSubmitting}
            className="rounded-lg px-3 py-2 border border-gray-500 text-xs cursor-pointer hover:bg-gray-500 transition-colors duration-500"
          >
            Clear
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="rounded-lg px-3 py-2 border border-admin-active-color text-xs cursor-pointer hover:bg-admin-active-color transition-colors duration-500"
          >
            Update Details
          </button>
        </div>
      </form>
    </div>
  );
}
