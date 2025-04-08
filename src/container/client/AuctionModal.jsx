import { Modal } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";
import { auctionParticipation } from "../../services/userApiServices";

export default function AuctionModal(Props) {
  const { isModalOpen, handleCancel, data,setChanged } = Props;
  const token = localStorage.getItem("PrizeUserTkn");

  const validationSchema = Yup.object().shape({
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required"),
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    resetForm,
  } = useFormik({
    initialValues: {
      price: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const userId = jwtDecode(token).id;
        auctionParticipation(
          userId,
          data?.couponId?._id,
          values.price,
          setChanged,
          resetForm,
          handleCancel
        );
    },
  });

  return (
    <Modal
      title="Auction"
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={500}
    >
      <div className="w-full h-fit">
        <p>Id :- {data?.couponId?._id.slice(-8)}</p>
        <div className="w-full flex flex-col gap-2">
          <div>
            <label htmlFor="price" className="text-xs text-black">
              Auction Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={values.price}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter auction start price"
              className="w-full px-3 py-1 text-xs rounded-lg outline-none border border-admin-active-color text-black bg-gray400/80 placeholder:text-gray-400"
            />
            {errors.price && touched.price && (
              <p className="text-xs text-red-500">{errors.price}</p>
            )}
            <div className="flex justify-center items-center">
              <button
                type="button"
                onClick={handleSubmit}
                className="text-xs rounded-lg px-3 py-1  bg-admin-active-color shadow-xl mt-2 cursor-pointer text-white"
              >
                Start Auction
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
