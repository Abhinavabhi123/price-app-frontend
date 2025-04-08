import { useEffect, useState } from "react";
import Header from "../../container/client/Header";
import {
  couponForAuction,
  getAllAuctions,
} from "../../services/userApiServices";

import { SiTicktick } from "react-icons/si";
import { RiCloseFill } from "react-icons/ri";
import { io } from "socket.io-client";
import { jwtDecode } from "jwt-decode";
import {
  errorToast,
  successToast,
} from "../../components/Notification/Notification";
import SpinWheel from "../../assets/Fortune-Wheel.gif";
import { useNavigate } from "react-router-dom";
import AuctionModal from "../../container/client/AuctionModal";
import ParticipateAuctionModal from "../../container/client/ParticipateAuctionModal";
const socket = io(import.meta.env.VITE_SERVER_URL);

export default function AuctionsPage() {
  const [auctionData, setAuctionData] = useState([]);
  const [userId, setUserId] = useState("");
  const [couponData, setCouponData] = useState([]);
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});
  const [changed, setChanged] = useState(false);

  const token = localStorage.getItem("PrizeUserTkn");

  useEffect(() => {
    if (token) {
      const id = jwtDecode(token).id;
      setUserId(id);
    } else {
      navigate("login");
    }
  }, [navigate, token]);

  // Fetch auctions only when userId is available and `changed` toggles
  useEffect(() => {
    if (userId) {
      getAllAuctions(userId, setAuctionData);
      couponForAuction(userId, setCouponData);
    }
  }, [userId, changed]);

  useEffect(() => {
    socket.on("bidUpdate", () => {
      setChanged((prev) => !prev);
    });

    socket.on("updateAuction", () => {
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
    const [auctionModalOpen, setAuctionModalOpen] = useState(false);
    const [timer, setTimer] = useState(0);
    const [auctionModalData, setAuctionModalData] = useState({});

    useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
      });

      socket.on("clearTimer", () => {
        setTimer(null);
      });

      socket.on(
        "timerUpdate",
        ({ couponId: updatedCouponId, remainingTime }) => {
          if (updatedCouponId === coupon._id) {
            setTimer(Math.floor(remainingTime / 1000));
          }
        }
      );

      socket.on("auctionEnded", ({ couponId: endedCouponId }) => {
        // console.log(endedCouponId === coupon._id, "endedCouponId");
        successToast(`Auction ended for ${endedCouponId}`);
        setChanged((prev) => !prev);
      });

      return () => {
        socket.off("timerUpdate");
        socket.off("auctionEnded");
      };
    }, [coupon._id]);

    const formatTime = (seconds) => {
      const minutes = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
    };

    function closeAuctionModal() {
      setAuctionModalOpen(false);
      setAuctionModalData({});
    }

    return (
      <div className="w-full md:max-w-72 min-h-20 relative h-fit px-2 pb-2  md:p-4  bg-gray-300/50 rounded-xl shadow-xl bg-opacity-25">
        <ParticipateAuctionModal
          isModalOpen={auctionModalOpen}
          handleCancel={closeAuctionModal}
          coupon={auctionModalData}
          socket={socket}
          token={token}
        />
        <p className="text-sm">ID :- {coupon?._id.slice(-8)}</p>
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
                    className="text-xs ps-3 items-center gap-2 hidden md:flex"
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
                <p className="text-xs ps-2 hidden md:block">
                  Date:-{coupon?.auctionDetails?.auction_date || ""}
                </p>
              </div>
              {timer ? (
                <h1 className="text-white ">
                  Auction Timer: {formatTime(timer)}
                </h1>
              ) : (
                ""
              )}
              {coupon?.auctionDetails?.auction_user !== userId ? (
                <div className="flex justify-center">
                  <button
                    className="
                  text-xs rounded-lg px-5 py-1  bg-admin-active-color shadow-xl mt-2 cursor-pointer"
                    onClick={() => {
                      setAuctionModalOpen(true);
                      setAuctionModalData(coupon);
                    }}
                  >
                    Enter
                  </button>
                </div>
              ) : (
                <div className=" flex items-end">
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

  // function to close auction modal
  function closeModal() {
    setModalData({});
    setModalOpen(false);
  }

  return (
    <div className="w-screen h-dvh md:min-h-full overflow-x-hidden bg-primary-color pb-20">
      <Header />
      <div className="w-full h-fit px-10 md:px-28 mt-3">
        {auctionData && auctionData.length > 0 && (
          <div className="flex justify-center items-center">
            <img src={SpinWheel} alt="spin wheel" className="size-40" />
          </div>
        )}
        {auctionData[0] && (
          <p className="text-center">
            Auction for{" "}
            <span className="font-bold">
              {auctionData[0]?.couponCard?.name?.name}
            </span>
          </p>
        )}
        <p> Active Auctions Coupons:-</p>
        <div className="w-full h-[65vh] flex flex-col gap-3 md:hidden bg-gray-800 overflow-y-scroll">
          {auctionData && auctionData.length > 0 ? (
            auctionData.map((coupon, index) => (
              <AuctionCoupon coupon={coupon} key={index} />
            ))
          ) : (
            <div className="flex justify-center items-center w-full h-full">
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
            <div className="flex justify-center items-center min-h-[70vh]">
              <p className="text-sm text-gray-500">No Auction available</p>
            </div>
          )}
        </div>
      </div>
      {couponData.length > 0 && (
        <div className="md:hidden flex w-full h-20 bg-gray-500/40 mt-5 items-center gap-3 px-5 overflow-x-scroll">
          <AuctionModal
            isModalOpen={modalOpen}
            handleCancel={closeModal}
            data={modalData}
            setChanged={setChanged}
          />
          {couponData &&
            couponData.map((coupon, index) => {
              return (
                <div
                  key={index}
                  className=" w-fit h-fit px-5 flex flex-col justify-center items-center"
                >
                  <div>
                    <p
                      className="text-red-500 cursor-pointer"
                      onClick={() => {
                        setModalData(coupon);
                        setModalOpen(true);
                      }}
                    >
                      List
                    </p>
                  </div>
                  <div>
                    <p className="bg-red-200 px-3 text-black">
                      {coupon?.couponId?._id.slice(-8)}
                    </p>
                  </div>
                </div>
              );
            })}
        </div>
      )}
    </div>
  );
}
