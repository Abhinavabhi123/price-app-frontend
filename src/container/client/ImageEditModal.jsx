import { Modal } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { RiUploadCloud2Line } from "react-icons/ri";
import { useEffect, useRef, useState } from "react";
import { changeUserProfileImage } from "../../services/userApiServices";
import { useDispatch } from "react-redux";

export default function ImageEditModal(Props) {
  const { setShowModal, isModalOpen,setChanged } = Props;
  const imageRef = useRef(null);
  const dispatch = useDispatch();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const handleCancel = () => {
    setShowModal(false);
    setPreview(null);
  };
  const validationSchema = Yup.object().shape({
    image: Yup.mixed()
      .required("Image is required")
      .test(
        "fileType",
        "Only JPG, PNG, and JPEG files are allowed",
        (value) =>
          !value ||
          (value &&
            ["image/jpeg", "image/png", "image/jpg"].includes(value.type))
      )
      .test(
        "fileSize",
        "File size must be less than 5MB",
        (value) => !value || (value && value.size <= 5 * 1024 * 1024)
      ),
  });

  const {
    errors,
    resetForm,
    touched,
    handleBlur,
    setFieldValue,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      image: "",
    },
    validationSchema,
    onSubmit: (values) => {
      changeUserProfileImage(
        values,
        resetForm,
        handleCancel,
        setSubmitting,
        dispatch,
        setChanged
      );
    },
  });

  useEffect(() => {
    if (!setShowModal) {
      if (imageRef.current) {
        imageRef.current.value = "";
      }
      resetForm();
    }
  }, [setShowModal, resetForm]);

  return (
    <Modal
      title="Edit Profile Image"
      open={isModalOpen}
      onCancel={handleCancel}
      footer={false}
    >
      <div className="w-full h-full space-y-4">
        <div>
          <label
            htmlFor="image"
            className="w-32 h-8 rounded-xl flex justify-center items-center bg-admin-active-color text-white cursor-pointer relative"
          >
            <input
              type="file"
              name="image"
              id="image"
              accept="image/*"
              ref={imageRef}
              onChange={handleFileChange}
              onBlur={handleBlur}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <RiUploadCloud2Line className="mr-2" />
            <span>Upload</span>
          </label>
          {errors?.image && touched?.image && (
            <p className="text-red-500 text-xs">{errors.image}</p>
          )}
        </div>
        <div className="relative overflow-hidden w-32 h-32 border border-gray-300 rounded-md flex justify-center items-center bg-gray-100">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-full h-full object-cover rounded-md "
            />
          ) : (
            <span className="text-gray-500">No Image</span>
          )}
        </div>
        <div className="w-full h-fit flex justify-center text-white  items-center">
          <button
            disabled={isSubmitting}
            type="button"
            onClick={handleSubmit}
            className={` px-2 py-1 bg-admin-active-color rounded-lg cursor-pointer`}
          >
            {" "}
            Save Image{" "}
          </button>
        </div>
      </div>
    </Modal>
  );
}
