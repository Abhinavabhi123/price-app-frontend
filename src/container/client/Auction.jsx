import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import {
  getUserAuctionCoupons,
  startAuction,
} from "../../services/userApiServices";
import { SiTicktick } from "react-icons/si";
import { RiCloseFill } from "react-icons/ri";
import { useFormik } from "formik";
import * as Yup from "yup";
import { errorToast } from "../../components/Notification/Notification";

const socket = io(import.meta.env.VITE_SERVER_URL);

export default function Auction(Props) {
  const { userId } = Props;
  const [auctionData, setAuctionData] = useState([]);
  const [changed, setChanged] = useState(false);

  useEffect(() => {
    if (userId) {
      getUserAuctionCoupons(userId, setAuctionData);
    }
  }, [userId, changed]);

  useEffect(() => {
    socket.on("bidUpdate", () => {
      setChanged((prev) => !prev);
    });

    socket.on("bidError", (err) => {
      errorToast(err.message);
    });
    socket.on("auctionEnded", () => {
      setChanged((prev) => !prev);
    });

    return () => {
      socket.off("bidUpdate");
      socket.off("bidError");
      socket.off("auctionEnded");
    };
  }, []);

  function AuctionCoupon(Props) {
    const { coupon } = Props;

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
        startAuction(
          userId,
          coupon?.couponId?._id,
          values.price,
          setChanged,
          resetForm
        );
      },
    });

    return (
      <div className="w-full max-w-72 min-h-20 relative h-fit p-4  bg-gray-300/50 rounded-xl shadow-xl bg-opacity-25">
        <p className="text-sm text-center">
          <span className="text-base">
            {coupon?.couponId?.couponCard?.name?.name}
          </span>{" "}
        </p>
        <p className="text-sm">ID :- {coupon?.couponId?._id.slice(-8)}</p>
        <p className="text-sm">
          Price Money: {coupon?.couponId?.couponCard?.priceMoney} Rs
        </p>
        <p className="text-sm">
          Premium: {coupon?.couponId?.couponCard?.premium} Rs
        </p>
        <p className="text-sm">
          Start:{" "}
          {new Date(coupon?.couponId?.couponCard?.startDate).toLocaleString()}
        </p>
        <p className="text-sm">
          End:{" "}
          {new Date(coupon?.couponId?.couponCard?.endDate).toLocaleString()}
        </p>
        {coupon?.couponId?.couponCard?.isEliminationStarted &&
          coupon?.couponId?.couponCard?.completed && (
            <div>
              <p className="text-sm">Elimination Dates</p>
              {coupon?.couponId?.couponCard?.eliminationStages?.map(
                (elimination, index) => (
                  <p
                    className="text-xs ps-3 flex items-center gap-2"
                    key={index}
                  >
                    Date {index + 1} :-{" "}
                    {new Date(elimination.stageDate).toLocaleString()}
                    {elimination.status ? (
                      <SiTicktick className="text-green-500" />
                    ) : (
                      <RiCloseFill size={18} className="text-red-500" />
                    )}
                  </p>
                )
              )}
            </div>
          )}
        <div>
          {coupon?.couponId && !coupon?.couponId.auctionDetails ? (
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
                  className="w-full px-3 py-1 text-xs rounded-lg outline-none border border-white text-black bg-gray400/80 placeholder:text-gray-400"
                />
                {errors.price && touched.price && (
                  <p className="text-xs text-red-500">{errors.price}</p>
                )}
                <div className="flex justify-center items-center">
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="text-xs rounded-lg px-3 py-1  bg-admin-active-color shadow-xl mt-2 cursor-pointer"
                  >
                    Start Auction
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-black mb-4">
              <p className="text-sm ">Auction details:</p>
              <p className="text-xs ps-2 ">
                {coupon?.couponId.auctionDetails?.auction_user === userId &&
                  "You started the auction"}
              </p>
              <p className="text-xs ps-2">
                Price:-{coupon?.couponId.auctionDetails?.auction_price || ""}
              </p>
              <p className="text-xs ps-2">
                Date:-{coupon?.couponId.auctionDetails?.auction_date || ""}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[20rem] px-10 md:px-28">
      <div className="w-full h-full bg-transparent">
        <div className="my-3">
          <p className="mb-2">Pending Coupons:-</p>
          {auctionData && auctionData.length ? (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center md:place-items-start">
              {auctionData.map((coupon, index) => (
                <AuctionCoupon coupon={coupon} key={index} />
              ))}
            </div>
          ) : (
            <div className="p-5">
              <p>No auction coupons</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
