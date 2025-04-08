import { Modal } from "antd";
import InputField from "../../components/admin/InputField";
import { RiUploadCloud2Line } from "react-icons/ri";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";
import { useFormik } from "formik";
import { useEffect, useRef, useState } from "react";
import * as Yup from "yup";
import {
  editArtDetails,
  editArtWithImage,
  postArtDetails,
} from "../../services/adminApiServices";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ArtModal(Props) {
  const { handleCancel, isModalOpen, setChange, title, data = {} } = Props;
  const imageRef = useRef(null);
  const [preview, setPreview] = useState(null);
  const MySwal = withReactContent(Swal);

  const handleFileChange = (event) => {
    const file = event.currentTarget.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
      setFieldValue("image", file);
    }
  };

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
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

  const editSchema = Yup.object().shape({
    name: Yup.string().required("Name is required"),
    description: Yup.string().required("Description is required"),
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
    question: Yup.string().required("Question is required"),
    answer: Yup.string().required("Answer is required"),
    image: Yup.mixed()
      .optional()
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
    values,
    errors,
    isSubmitting,
    handleChange,
    handleBlur,
    handleSubmit,
    setFieldValue,
    handleReset,
    touched,
    resetForm,
    setSubmitting,
  } = useFormik({
    initialValues: {
      name: "",
      description: "",
      price: "",
      question: "",
      answer: "",
      image: "",
    },
    validationSchema:
      !Object.keys(data).length > 0 ? validationSchema : editSchema,
    onSubmit: (values) => {
      if (Object.keys(data).length === 0) {
        //  create function
        
        postArtDetails(values, setSubmitting, setChange, handleCancel);
      } else {
        MySwal.fire({
          title: "Are you sure?",
          text: "You want to edit this Art!",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Yes, delete it!",
        }).then((result) => {
          if (result.isConfirmed) {
            // edit function
            if (values.image) {
              // Edit function with image
              editArtWithImage(
                values,
                data?._id,
                setChange,
                handleCancel,
                setSubmitting
              );
            } else {
              // Edit function without image
              editArtDetails(
                values,
                data?._id,
                setChange,
                handleCancel,
                setSubmitting
              );
            }
          }
        });
      }
    },
  });
  useEffect(() => {
    if (isModalOpen === false && imageRef.current) {
      imageRef.current.value = "";
      setPreview(null);
      resetForm();
    }
  }, [isModalOpen, resetForm]);
  useEffect(() => {
    if (data && Object.keys(data).length > 0) {
      setFieldValue("name", data?.name);
      setFieldValue("description", data?.description);
      setFieldValue("price", data?.price);
      setFieldValue("question", data?.question);
      setFieldValue("answer", data?.answer);
    }
  }, [data, setFieldValue]);

  return (
    <Modal
      title={title}
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
    >
      <div className="w-full">
        <form
          className="space-y-2 w-full h-full"
          onReset={() => {
            handleReset();
            setPreview(null);
            if (imageRef.current) {
              imageRef.current.value = "";
            }
          }}
          onSubmit={handleSubmit}
        >
          {/* form row  1 */}
          <div className="space-y-5">
            <label htmlFor="name" className="font-semibold text">
              Art Name
              <span className="text-xs text-red-500"> *</span>
            </label>
            <div>
              <InputField
                name="name"
                id="name"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values?.name}
                className="border border-admin-active-color"
              />
              {errors?.name && touched?.name && (
                <p className="text-xs text-red-500">{errors?.name}</p>
              )}
            </div>
          </div>
          {/* form row 2 */}
          <div className="space-y-5">
            <label htmlFor="description" className="font-semibold text">
              Description
              <span className="text-xs text-red-500"> *</span>
            </label>
            <div>
              <textarea
                type="textarea"
                name="description"
                id="description"
                style={{ resize: "none" }}
                onBlur={handleBlur}
                onChange={handleChange}
                value={values.description}
                className="outline-none h-28 px-3 py-2 border rounded-lg w-full border-admin-active-color"
              />
              {errors?.description && touched?.description && (
                <p className="text-xs text-red-500">{errors?.description}</p>
              )}
            </div>
          </div>

          {/* form row 3 */}
          <div className="space-y-5">
            <label htmlFor="price" className="font-semibold text">
              Price
              <span className="text-xs text-red-500"> *</span>
            </label>
            <div>
              <InputField
                id="price"
                name="price"
                type="number"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.price}
                className="border border-admin-active-color"
              />
              {errors?.price && touched?.price && (
                <p className="text-xs text-red-500">{errors?.price}</p>
              )}
            </div>
          </div>
          {/* form row 4 */}
          <div className="space-y-5">
            <label htmlFor="question" className="font-semibold text">
              Question
              <span className="text-xs text-red-500"> *</span>
            </label>
            <div>
              <InputField
                id="question"
                name="question"
                type="text"
                handleChange={handleChange}
                handleBlur={handleBlur}
                value={values.question}
                className="border border-admin-active-color"
              />
              {errors?.question && touched?.question && (
                <p className="text-xs text-red-500">{errors?.question}</p>
              )}
            </div>
          </div>
          {/* form row 5 */}
          <div className="space-y-5">
            <label htmlFor="answer" className="font-semibold text">
              Answer
              <span className="text-xs text-red-500"> *</span>
            </label>
            <div>
              <InputField
                id="answer"
                name="answer"
                type="text"
                handleBlur={handleBlur}
                handleChange={handleChange}
                value={values.answer}
                className="border border-admin-active-color"
              />
              {errors?.answer && touched?.answer && (
                <p className="text-xs text-red-500">{errors?.answer}</p>
              )}
            </div>
          </div>
          {/* form row 6 */}
          <div className="flex gap-10">
            <div className="space-y-5">
              <label htmlFor="image" className="font-semibold text">
                Image
                <span className="text-xs text-red-500"> *</span>
              </label>
              <div>
                <label
                  htmlFor="image"
                  className="w-32 h-8 rounded-xl flex justify-center items-center bg-red-500 text-white cursor-pointer relative"
                >
                  <input
                    type="file"
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={handleFileChange}
                    onBlur={handleBlur}
                    ref={imageRef}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <RiUploadCloud2Line className="mr-2" />
                  <span>Upload</span>
                </label>
                {errors?.image && touched?.image && (
                  <p className="text-xs text-red-500">{errors?.image}</p>
                )}
              </div>
            </div>

            <div className="relative overflow-hidden w-32 h-32 border border-gray-300 rounded-md flex justify-center items-center bg-gray-100">
              {preview || (data && Object.keys(data).length > 0) ? (
                <img
                  src={
                    !preview && Object.keys(data).length > 0
                      ? `${import.meta.env.VITE_SERVER_URL}/uploads/arts/${
                          data?.image
                        }`
                      : preview
                  }
                  alt="Preview"
                  className="w-full h-full object-cover rounded-md "
                />
              ) : (
                <span className="text-gray-500">No Image</span>
              )}
            </div>
          </div>

          <div className="w-full flex justify-center items-center gap-5">
            {Object.keys(data).length === 0 && (
              <button
                type="reset"
                className="px-3 py-1 rounded-lg bg-gray-500 outline-none cursor-pointer text-white"
              >
                Clear
              </button>
            )}
            {!isSubmitting ? (
              <button
                type="submit"
                className="px-3 py-1 rounded-lg bg-admin-active-color cursor-pointer outline-none text-white"
              >
                {Object.keys(data).length === 0 ? "Submit" : "Edit"}
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
