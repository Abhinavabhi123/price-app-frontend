import { useEffect, useState } from "react";
import Header from "../../container/client/Header";
import { getAllAuctions } from "../../services/userApiServices";
import { useFormik } from "formik";
import * as Yup from "yup";
import { SiTicktick } from "react-icons/si";
import { RiCloseFill } from "react-icons/ri";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import { errorToast } from "../../components/Notification/Notification";
import SpinWheel from "../../assets/Fortune-Wheel.gif";
const socket = io(import.meta.env.VITE_SERVER_URL);

export default function AuctionsPage() {
  const [auctionData, setAuctionData] = useState([]);

  const [changed, setChanged] = useState(false);

  const userId = jwtDecode(localStorage.getItem("PrizeUserTkn")).id;

  useEffect(() => {
    if (userId) {
      getAllAuctions(userId, setAuctionData);
    }
  }, [userId, changed]);

  useEffect(() => {
    socket.on("bidUpdate", () => {
      setChanged((prev) => !prev);
    });

    socket.on("bidError", (err) => {
      errorToast(err.message);
    });

    return () => {
      socket.off("bidUpdate");
      socket.off("bidError");
    };
  }, []);

  function AuctionCoupon(Props) {
    const { coupon } = Props;
    const [timer, setTimer] = useState(0);
    const auctionPrice = coupon?.auctionDetails?.auction_price || 0;

    useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected to WebSocket server", socket.id);
      });

      socket.on("clearTimer", () => {
        setTimer(null);
      });

      socket.on(
        "timerUpdate",
        ({ couponId: updatedCouponId, remainingTime }) => {
          console.log(
            updatedCouponId,
            coupon._id,
            updatedCouponId === coupon._id,
            "timer"
          );
          setTimer(Math.floor(remainingTime / 1000));
          // if (updatedCouponId === coupon._id) {
          //   setTimer(Math.floor(remainingTime / 1000));
          // }
        }
      );

      socket.on("auctionEnded", ({ couponId: endedCouponId }) => {
        console.log(endedCouponId === coupon._id, "endedCouponId");
        setChanged((prev) => !prev);

        // if (endedCouponId === coupon._id) {
        //   setChanged((prev) => !prev);
        // }
      });

      return () => {
        socket.off("timerUpdate");
        socket.off("auctionEnded");
      };
    }, [coupon._id]);

    const validationSchema = Yup.object().shape({
      price: Yup.number()
        .typeError("Price must be a number")
        .positive("Price must be greater than zero")
        .required("Price is required")
        .min(auctionPrice, `Price must be greater than ${auctionPrice}`),
    });

    const { values, errors, handleChange, handleBlur, handleSubmit, touched } =
      useFormik({
        initialValues: {
          price: auctionPrice,
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

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    return (
      <div className="w-full md:max-w-72 min-h-20 relative h-fit px-2 pb-2 md:pb-0  md:p-4  bg-gray-300/50 rounded-xl shadow-xl bg-opacity-25">
        <p className="text-sm text-center">
          <span className="text-base">{coupon?.couponCard?.name}</span>{" "}
        </p>
        <p className="text-sm">ID :- {coupon?._id}</p>
        <p className="text-sm hidden md:block">
          Price Money: {coupon?.couponCard?.priceMoney} Rs
        </p>
       
        <p className="text-sm hidden md:block">
          Start: {new Date(coupon?.couponCard?.startDate).toLocaleString()}
        </p>
        <p className="text-sm hidden md:block">
          End: {new Date(coupon?.couponCard?.endDate).toLocaleString()}
        </p>
        {coupon?.couponCard?.isEliminationStarted &&
          !coupon?.couponCard?.completed && (
            <div>
              <p className="text-sm hidden md:block">Elimination Dates</p>
              {coupon?.couponCard?.eliminationStages?.map(
                (elimination, index) => (
                  <p
                    className="text-xs ps-3 flex items-center gap-2 hidden md:block"
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
          {coupon && coupon?.auctionDetails ? (
            <div className="w-full flex flex-col gap-2">
              <div className="text-black">
                <p className="text-sm hidden md:block">Auction details:</p>
                <p className="text-xs ps-2">
                  Last Price:-{coupon?.auctionDetails?.auction_price || ""}
                </p>
                <p className="text-sm">Premium: {coupon?.couponCard?.premium} Rs</p>
                <p className="text-xs ps-2 hidden md:block">
                  Date:-{coupon?.auctionDetails?.auction_date || ""}
                </p>
              </div>
              {timer ? <h1 className="text-white">Auction Timer: {formatTime(timer)}</h1> : ""}
              {coupon?.auctionDetails?.auction_user !== userId ? (
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
                  <p className="text-[8px] text-yellow-300">
                    *When bidding the premium will debit from your wallet.*
                  </p>
                  <div className="flex justify-center items-center">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="text-xs rounded-lg px-5 py-1  bg-admin-active-color shadow-xl mt-2 cursor-pointer"
                    >
                      Bid
                    </button>
                  </div>
                </div>
              ) : (
                <div className="md:min-h-24 flex items-end">
                  <p className="text-xs text-green-400">
                    Congratulations! 🎉 Your bid has been placed successfully!
                    🚀 Best of luck in the auction!
                  </p>
                </div>
              )}
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    );
  }
  console.log(auctionData, "auctionData");

  return (
    <div className="w-screen h-dvh md:h-full overflow-x-hidden bg-primary-color pb-20">
      <Header />
      <div className="w-full h-fit px-10 md:px-28 mt-3">
        {auctionData && auctionData.length > 0 && (
          <div className="flex justify-center items-center">
            <img src={SpinWheel} alt="spin wheel" className="size-40" />
          </div>
        )}
        <p> Active Auctions Coupons:-</p>
        <div className="w-full max-h-[80vh] flex flex-col gap-3 md:hidden bg-gray-800 overflow-x-scroll">
          {auctionData && auctionData.length > 0 ? (
            auctionData.map((coupon, index) => (
              <AuctionCoupon coupon={coupon} key={index} />
            ))
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-sm text-gray-500">No Auction available</p>
            </div>
          )}
        </div>
        <div className="my-5 hidden md:block">
          {auctionData && auctionData.length > 0 ? (
            <div className="w-full h-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center md:place-items-start">
              {auctionData.map((coupon, index) => (
                <AuctionCoupon coupon={coupon} key={index} />
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center">
              <p className="text-sm text-gray-500">No Auction available</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
