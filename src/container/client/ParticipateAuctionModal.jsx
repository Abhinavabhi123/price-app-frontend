import { Modal } from "antd";
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import { jwtDecode } from "jwt-decode";

export default function ParticipateAuctionModal(Props) {
  const { isModalOpen, handleCancel, coupon, socket, token } = Props;
  const [userId, setUserId] = useState(null);
  const [auctionPrice, setAuctionPrice] = useState(0);

  const validationSchema = Yup.object().shape({
    price: Yup.number()
      .typeError("Price must be a number")
      .positive("Price must be greater than zero")
      .required("Price is required")
      .min(auctionPrice, `Price must be greater than ${auctionPrice}`),
  });

  const {
    values,
    errors,
    handleChange,
    handleBlur,
    handleSubmit,
    touched,
    setFieldValue,
  } = useFormik({
    initialValues: {
      price: 0,
    },
    validationSchema,
    context: { auction_price: auctionPrice },
    onSubmit: (values) => {
      socket.emit("placeBid", {
        couponId: coupon._id,
        userId,
        bidAmount: values.price,
      });
    },
  });
  useEffect(() => {
    if (token) {
      const userId = jwtDecode(token).id;
      setUserId(userId);
    }
    if (coupon) {
      setAuctionPrice(coupon?.auctionDetails?.auction_price || 0);
      setFieldValue("price", coupon?.auctionDetails?.auction_price);
    }
  }, [token, coupon, setFieldValue]);
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
        <div>
          <label htmlFor="price" className="text-xs text-black">
            Auction Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={values.price||""}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Enter auction start price"
            className="w-full px-3 py-1 text-xs rounded-lg outline-none border border-admin-active-color text-black bg-gray400/80 placeholder:text-gray-400"
          />
          {errors.price && touched.price && (
            <p className="text-xs text-red-500">{errors.price}</p>
          )}
          <p className="text-[8px] text-yellow-300">
            *When bidding the premium will debit from your wallet.*
          </p>
          <div className="flex justify-center items-center">
            <button
              type="button"
              onClick={handleSubmit}
              className="text-xs rounded-lg px-5 py-1  bg-admin-active-color shadow-xl mt-2 cursor-pointer text-white"
            >
              Bid
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
