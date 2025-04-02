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

  function CardInputField(Props) {
    const {
      type,
      id,
      name,
      handleChange = () => {},
      handleBlur = () => {},
      className = "",
      value,
      disabled,
    } = Props;
    return (
      <input
        type={type}
        id={id}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        disabled={disabled}
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
      .typeError("Start date must be a valid date")
      .when("isStarted", {
        is: false,
        then: (schema) =>
          schema.min(new Date(), "Start date cannot be in the past"),
      }),
    endDate: Yup.date()
      .required("End date is required")
      .min(Yup.ref("startDate"), "End date must be after the start date")
      .typeError("End date must be a valid date"),
    cardImageId: Yup.string().required("Image is required"),
    eliminationStages: Yup.array().of(
      Yup.object().shape({
        stageDate: Yup.date()
          .required("Stage date is required")
          .typeError("Stage date must be a valid date")
          .test(
            "is-after-start",
            "Stage date must be after the start date",
            function (value) {
              return (
                new Date(value) >= new Date(this.options.context.startDate)
              );
            }
          )
          .test(
            "is-before-end",
            "Stage date must be before the end date",
            function (value) {
              return new Date(value) <= new Date(this.options.context.endDate);
            }
          ),
      })
    ),
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
    context: { isStarted: editDetails?.isStarted || false },
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
    setFieldValue("endDate", editDetails.endDate ? editDetails.endDate : "");
    if (
      editDetails.eliminationStages &&
      editDetails.eliminationStages.length > 0
    ) {
      setFieldValue(
        "eliminationStages",
        editDetails.eliminationStages.map((stage) => ({
          stageDate: stage.stageDate,
          status: stage.status,
          _id: stage._id,
        }))
      );
    }
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
        {editDetails.isStarted && (
          <p className="text-xs text-yellow-500">
            The Lucky draw is already started,you can not change the name,card
            id, price money,premium and start date.And if the elimination stages
            is completed you can not change the particular elimination state.*
          </p>
        )}
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
              disabled={editDetails?.isStarted}
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
              disabled={editDetails?.isStarted}
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
              disabled={editDetails?.isStarted}
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
              disabled={editDetails?.isStarted}
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
              className={`color-scheme-light [&::-webkit-calendar-picker-indicator]:invert`}
              disabled={editDetails?.isStarted}
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
        <div className="w-full space-y-2">
          <p className="text-xs font-semibold">
            Elimination Stages
            <span className="text-xs text-red-500"> *</span>
          </p>
          <div className="space-y-4">
            {values.eliminationStages &&
              values.eliminationStages.map((_, index) => (
                <div key={index} className="flex flex-col gap-1">
                  <div className="flex gap-3">
                    <CardInputField
                      id={`stageDate-${index}`}
                      name={`eliminationStages.${index}.stageDate`}
                      type="datetime-local"
                      value={values.eliminationStages[index]?.stageDate || ""}
                      handleChange={handleChange}
                      handleBlur={handleBlur}
                      disabled={values.eliminationStages[index]?.status}
                      className="color-scheme-light [&::-webkit-calendar-picker-indicator]:invert"
                    />

                    <button
                      type="button"
                      onClick={() => {
                        const newStages = values.eliminationStages.filter(
                          (_, i) => i !== index
                        );
                        setFieldValue("eliminationStages", newStages);
                      }}
                      disabled={values.eliminationStages[index]?.status}
                      className={`bg-red-500 text-xs text-white px-3 rounded-lg cursor-pointer ${
                        values.eliminationStages[index]?.status && "opacity-15"
                      } `}
                    >
                      Remove
                    </button>
                  </div>
                  {errors.eliminationStages?.[index]?.stageDate &&
                    touched.eliminationStages?.[index]?.stageDate && (
                      <p className="text-xs text-red-500">
                        {errors.eliminationStages[index].stageDate}
                      </p>
                    )}
                </div>
              ))}
            <button
              type="button"
              onClick={() =>
                setFieldValue("eliminationStages", [
                  ...values.eliminationStages,
                  { stageDate: "", status: false },
                ])
              }
              className="bg-blue-500 text-xs text-white px-3 py-2 cursor-pointer rounded-lg"
            >
              Add Stage
            </button>
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
