import { Modal } from "antd";
import { RiUploadCloud2Line } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";
import { UploadCardImage } from "../../services/adminApiServices";
import { useEffect } from "react";

export default function CardImageModal(Props) {
  const {
    setPreview,
    handleCancel,
    setImageUploaded,
    isModalOpen,
    preview,
    imageRef,
  } = Props;

  const validationSchema = Yup.object().shape({
    imageName: Yup.string()
      .required("Image name is required")
      .min(3, "Image name must be at least 3 characters")
      .max(50, "Image name cannot exceed 50 characters"),

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
  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    handleReset,
    setFieldValue,
    setSubmitting,
    isSubmitting,
    resetForm,
  } = useFormik({
    initialValues: {
      imageName: "",
      image: "",
    },
    validationSchema,
    onSubmit: (values) => {
      UploadCardImage(
        values,
        setSubmitting,
        handleCancel,
        setImageUploaded,
        resetForm
      );
    },
  });

  useEffect(() => {
    if (isModalOpen === false) {
      resetForm();
    }
  }, [isModalOpen, resetForm]);

  return (
    <Modal
      title="Upload Image"
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="w-full h-full ">
        <form
          className="my-2 space-y-4"
          onSubmit={handleSubmit}
          onReset={() => {
            handleReset();
            setPreview(null);
            if (imageRef.current) {
              imageRef.current.value = "";
            }
          }}
        >
          <div>
            <label htmlFor="name" className="font-semibold text">
              Image name
              <span className="text-xs text-red-500"> *</span>
            </label>
            <input
              type="text"
              name="imageName"
              id="imageName"
              placeholder="Enter Image name"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.imageName}
              className="w-full ps-2 py-1 outline-none border border-admin-active-color rounded-lg"
            />
            {errors?.imageName && touched?.imageName && (
              <p className="text-red-500 text-xs">{errors.imageName}</p>
            )}
          </div>

          <div className="w-full space-y-2">
          <label htmlFor="name" className="font-semibold text">
            Image 
              <span className="text-xs text-red-500"> *</span>
            </label>
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
          </div>
          <div className="w-full flex justify-center items-center gap-5">
            <button
              type="reset"
              className="px-3 py-1 rounded-lg bg-gray-500 outline-none cursor-pointer text-white"
            >
              Clear
            </button>
            {!isSubmitting ? (
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-admin-active-color cursor-pointer outline-none text-white"
              >
                Submit
              </button>
            ) : (
              <div className="w-20 h-8 rounded-md bg-admin-active-color flex justify-center items-center">
                <SubmissionLoading borderColor="white" />
              </div>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
}
