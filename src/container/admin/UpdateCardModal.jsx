import { Modal } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import {
  editCardDetails,
  getCardImages,
} from "../../services/adminApiServices";
import { useNavigate } from "react-router-dom";
import SubmissionLoading from "../../components/Loading/SubmissionLoading";

export default function UpdateCardModal(Props) {
  const { isModalOpen, closeEditModal, setChanged, editDetails } = Props;
  const navigate = useNavigate();
  const [selected, setSelected] = useState("");
  const [active, setActive] = useState(false);
  const [cardImageData, setCardImageData] = useState([]);

  useEffect(() => {
    getCardImages(setCardImageData);
  }, []);

  console.log(editDetails, "editDetails");

  function CardInputField(Props) {
    const {
      type,
      id,
      name,
      handleChange = () => {},
      handleBlur = () => {},
      className = "",
      value,
    } = Props;
    return (
      <input
        type={type}
        id={id}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        className={`w-full px-3 py-2 text-black rounded-lg border border-admin-active-color outline-none ${className}`}
      />
    );
  }

  const validationSchema = Yup.object().shape({
    cardName: Yup.string()
      .trim()
      .required("Card name is required")
      .min(3, "Card name must be at least 3 characters")
      .max(50, "Card name cannot exceed 50 characters"),

    cardId: Yup.string()
      .trim()
      .required("Card ID is required")
      .matches(/^[A-Za-z0-9_-]+$/, "Card ID must be alphanumeric"),

    priceMoney: Yup.number()
      .required("Price is required")
      .min(1, "Price must be greater than 0")
      .typeError("Price must be a valid number"),

    premium: Yup.number()
      .required("Premium amount is required")
      .min(1, "Premium  must be greater than 0")
      .typeError("Premium must be a valid number"),

    startDate: Yup.date()
      .required("Start date is required")
      .min(new Date(), "Start date cannot be in the past")
      .typeError("Start date must be a valid date"),

    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after the start date")
      .typeError("End date must be a valid date"),
    cardImageId: Yup.string().required("Image is required"),
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    setFieldValue,
    touched,
    handleSubmit,
    isSubmitting,
    setSubmitting,
  } = useFormik({
    initialValues: {
      cardName: "",
      cardId: "",
      priceMoney: "",
      premium: "",
      startDate: "",
      endDate: "",
      cardImageId: "",
    },
    validationSchema,
    onSubmit: (values) => {
      editCardDetails(
        values,
        editDetails?._id,
        closeEditModal,
        setChanged,
        setSubmitting
      );
    },
  });

  useEffect(() => {
    setFieldValue("cardName", editDetails.name);
    setFieldValue("cardId", editDetails.cardId);
    setFieldValue("priceMoney", editDetails.priceMoney);
    setFieldValue("premium", editDetails.premium);
    setFieldValue(
      "startDate",
      editDetails.startDate ? editDetails.startDate : ""
    );
    // ? new Date(editDetails.startDate).toISOString().slice(0, 16)
    setFieldValue(
      "endDate",
      editDetails.endDate
        ? editDetails.endDate
        : ""
    );
  }, [setFieldValue, editDetails]);

  useEffect(() => {
    if (cardImageData.length > 0) {
      setSelected(cardImageData[0]);
      setFieldValue("cardImageId", cardImageData[0]._id);
    }
  }, [cardImageData, setFieldValue]);

  return (
    <Modal
      title="Edit card details"
      centered
      open={isModalOpen}
      onCancel={closeEditModal}
      footer={null}
      width={800}
    >
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* row 1 */}
        <div className="w-full flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <label htmlFor="cardName" className="text-xs font-semibold">
              Name
              <span className="text-xs text-red-500"> *</span>
            </label>
            <CardInputField
              type="text"
              id="cardName"
              name="cardName"
              value={values.cardName}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {errors?.cardName && touched?.cardName && (
              <p className="text-xs text-red-500">{errors.cardName}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="cardId" className="text-xs font-semibold">
              Card Id
              <span className="text-xs text-red-500"> *</span>
            </label>
            <CardInputField
              type="text"
              id="cardId"
              name="cardId"
              value={values.cardId}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {errors?.cardId && touched?.cardId && (
              <p className="text-xs text-red-500">{errors.cardId}</p>
            )}
          </div>
        </div>
        {/* row 2 */}
        <div className="w-full flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <label htmlFor="priceMoney" className="text-xs font-semibold">
              Price Money
              <span className="text-xs text-red-500"> *</span>
            </label>
            <CardInputField
              type="number"
              id="priceMoney"
              name="priceMoney"
              value={values.priceMoney}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {errors?.priceMoney && touched?.priceMoney && (
              <p className="text-xs text-red-500">{errors.priceMoney}</p>
            )}
          </div>
          <div className="w-full">
            <label htmlFor="premium" className="text-xs font-semibold">
              Premium Amount
              <span className="text-xs text-red-500"> *</span>
            </label>
            <CardInputField
              type="number"
              id="premium"
              name="premium"
              value={values.premium}
              handleChange={handleChange}
              handleBlur={handleBlur}
            />
            {errors?.premium && touched?.premium && (
              <p className="text-xs text-red-500">{errors.premium}</p>
            )}
          </div>
        </div>
        {/* row 3 */}
        <div className="w-full flex flex-col md:flex-row gap-3">
          <div className="w-full">
            <label htmlFor="startDate" className="text-xs font-semibold">
              Start Date
              <span className="text-xs text-red-500"> *</span>
            </label>
            <CardInputField
              type="datetime-local"
              id="startDate"
              name="startDate"
              value={values.startDate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className="color-scheme-light [&::-webkit-calendar-picker-indicator]:invert"
            />
            {errors?.startDate && touched?.startDate && (
              <p className="text-xs text-red-500">{errors.startDate}</p>
            )}
          </div>

          <div className="w-full">
            <label htmlFor="endDate" className="text-xs font-semibold">
              End Date
              <span className="text-xs text-red-500"> *</span>
            </label>
            <CardInputField
              type="datetime-local"
              id="endDate"
              name="endDate"
              value={values.endDate}
              handleChange={handleChange}
              handleBlur={handleBlur}
              className="color-scheme-light [&::-webkit-calendar-picker-indicator]:invert"
            />
            {errors?.endDate && touched?.endDate && (
              <p className="text-xs text-red-500">{errors.endDate}</p>
            )}
          </div>
        </div>
        {/* form row 4 */}
        <div className="flex flex-col md:flex-row gap-3 ">
          <div className="w-full">
            <p className="text-xs font-semibold mb-2">
              Select Image
              <span className="text-xs text-red-500"> *</span>
            </p>
            <div className="relative w-full h-10 flex gap-3">
              <div className="w-full md:w-[80%]">
                <button
                  onClick={() => setActive((prev) => !prev)}
                  type="button"
                  className="w-full cursor-pointer flex items-center justify-between bg-white border border-gray-300 py-2 text-black px-3 rounded-md text-sm"
                >
                  <img
                    src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
                      selected?.image
                    }`}
                    alt="card image"
                    className="w-5 h-5 mr-2 outline-1 outline-admin-active-color"
                  />
                  {selected.imageName}
                </button>
                {active && (
                  <ul className="absolute w-[80%] max-h-40 overflow-y-scroll bg-white border border-gray-300 rounded-md mt-1">
                    {cardImageData.map((item, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center gap-2 p-2 cursor-pointer hover:bg-gray-200 text-black text-sm"
                        onClick={() => {
                          setFieldValue("cardImageId", item?._id);
                          setSelected(item);
                          setActive(false);
                        }}
                      >
                        <img
                          src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
                            item.image
                          }`}
                          alt=""
                          className="w-5 h-5"
                        />
                        {item.imageName}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div className=" w-[50%] md:w-[20%] flex justify-center  items-center">
                <button
                  type="button"
                  className="text-sm outline-none h-full rounded-lg bg-admin-active-color text-white px-3 py-1 cursor-pointer truncate"
                  onClick={() => navigate("/admin/uploadImage")}
                >
                  Upload Image
                </button>
              </div>
            </div>
            <div className="size-40 ms-10 overflow-hidden rounded-lg outline-1 outline-red-500 mt-10">
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
                  selected?.image
                }`}
                alt="selected card image"
                className="size-full object-contain"
              />
            </div>
          </div>
          <div className="w-full"></div>
        </div>
        <div className="w-full flex justify-center items-center gap-3 mt-20 mb-10">
          {!isSubmitting ? (
            <button
              type="submit"
              className="rounded-lg bg-admin-active-color outline-none text-white px-3 py-1 text-sm cursor-pointer"
            >
              Save
            </button>
          ) : (
            <div className="w-16 h-7 rounded-lg bg-admin-active-color flex justify-center items-center">
              <SubmissionLoading borderColor="white" />
            </div>
          )}
        </div>
      </form>
    </Modal>
  );
}
