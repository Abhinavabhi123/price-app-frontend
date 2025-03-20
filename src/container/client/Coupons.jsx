import { useEffect, useState } from "react";
import {
  getUserCoupons,
  makeCouponForAuction,
} from "../../services/userApiServices";
import { SiTicktick } from "react-icons/si";
import { RiCloseFill } from "react-icons/ri";
import { FaMedal } from "react-icons/fa";

export default function Coupons(Props) {
  const { userData, setSelected } = Props;

  const [couponData, setCouponData] = useState([]);
  const [pendingCoupons, serPendingCoupons] = useState([]);
  const [winnerCoupons, setWinnerCoupons] = useState([]);
  const [completedCoupons, setCompletedCoupons] = useState([]);

  useEffect(() => {
    if (userData?._id) {
      console.log("hello");
      getUserCoupons(userData?._id, setCouponData);
    }
  }, [userData?._id]);

  useEffect(() => {
    if (couponData.length > 0) {
      // pending coupons
      serPendingCoupons(
        couponData.filter(
          (coupon) =>
            coupon?.couponId.status &&
            !coupon?.couponId.couponCard?.completed &&
            !coupon?.couponId?.auction
        )
      );
      // winner coupons
      setWinnerCoupons(
        couponData.filter(
          (coupon) =>
            coupon?.couponId.couponCard?.winnerCoupon === coupon.couponId._id
        )
      );

      // completed coupons
      setCompletedCoupons(
        couponData.filter(
          (coupon) =>
            !coupon?.couponId?.status &&
            coupon?.couponId.couponCard?.winnerCoupon !== coupon.couponId._id
        )
      );
    }
  }, [couponData]);

  function couponForAuction(id) {
    makeCouponForAuction(id, setSelected);
  }

  return (
    <div className="w-full min-h-[20rem] px-10 md:px-28">
      <div className="w-full h-full bg-transparent">
        {/* top section */}
        <div className="w-full h-fit">
          <p className="p-5">Coupons :-</p>
        </div>
        {/* Pending coupon section */}
        <div className="my-3">
          <p className="mb-2">Pending Coupons:-</p>
          {pendingCoupons && pendingCoupons.length ? (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center md:place-items-start">
              {pendingCoupons.map((coupon, index) => (
                <div
                  key={index}
                  className="w-full max-w-72 min-h-20 relative h-fit p-4  bg-gray-300/50 rounded-xl shadow-xl bg-opacity-25"
                >
                  <p className="text-sm text-center">
                    <span className="text-base">
                      {coupon?.couponId?.couponCard?.name}
                    </span>{" "}
                  </p>
                  <p className="text-sm">ID :- {coupon?.couponId?._id}</p>
                  <p className="text-sm">
                    Price Money: {coupon?.couponId?.couponCard?.priceMoney} Rs
                  </p>
                  <p className="text-sm">
                    Premium: {coupon?.couponId?.couponCard?.premium} Rs
                  </p>
                  <p className="text-sm">
                    Start:{" "}
                    {new Date(
                      coupon?.couponId?.couponCard?.startDate
                    ).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    End:{" "}
                    {new Date(
                      coupon?.couponId?.couponCard?.endDate
                    ).toLocaleString()}
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
                                <RiCloseFill
                                  size={18}
                                  className="text-red-500"
                                />
                              )}
                            </p>
                          )
                        )}
                      </div>
                    )}
                  {coupon?.couponId?.couponCard?.isEliminationStarted &&
                    !coupon?.couponId?.couponCard?.completed &&
                    coupon?.couponId?.status && (
                      <div className="text-xs flex flex-col space-y-3 mt-2">
                        <p>You can list your coupon for auction</p>
                        <div className="flex justify-end">
                          <button
                            type="button"
                            onClick={() =>
                              couponForAuction(coupon?.couponId?._id)
                            }
                            className="w-fit text-xs rounded-lg py-1 px-4 bg-admin-active-color text-white cursor-pointer"
                          >
                            List coupon for auction
                          </button>
                        </div>
                      </div>
                    )}
                  {!coupon?.couponId?.couponCard?.completed && (
                    <p className="text-xs text-center mt-2">
                      Lucky Draw not completed
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5">
              <p>No Pending coupons</p>
            </div>
          )}
        </div>
        {/* Winner coupon section */}
        <div className="my-5">
          <p className="mb-2">Winner Coupons:-</p>
          {winnerCoupons && winnerCoupons.length ? (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center md:place-items-start">
              {winnerCoupons.map((coupon, index) => (
                <div
                  key={index}
                  className="w-full max-w-72 min-h-20 relative h-fit p-4  bg-gray-300/50 rounded-xl shadow-xl bg-opacity-25"
                >
                  <p className="text-sm text-center">
                    <span className="text-base">
                      {coupon?.couponId?.couponCard?.name}
                    </span>{" "}
                  </p>
                  <p className="text-sm">ID :- {coupon?.couponId?._id}</p>
                  <p className="text-sm">
                    Price Money: {coupon?.couponId?.couponCard?.priceMoney} Rs
                  </p>
                  <p className="text-sm">
                    Premium: {coupon?.couponId?.couponCard?.premium} Rs
                  </p>
                  <p className="text-sm">
                    Start:{" "}
                    {new Date(
                      coupon?.couponId?.couponCard?.startDate
                    ).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    End:{" "}
                    {new Date(
                      coupon?.couponId?.couponCard?.endDate
                    ).toLocaleString()}
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
                                <RiCloseFill
                                  size={18}
                                  className="text-red-500"
                                />
                              )}
                            </p>
                          )
                        )}
                      </div>
                    )}
                  {coupon?.couponId?.couponCard?.completed && (
                    <p className="text-sm text-center mt-2">
                      🎉Lucky Draw Completed🎉
                    </p>
                  )}
                  {coupon?.couponId?._id ===
                    coupon?.couponId?.couponCard?.winnerCoupon &&
                    coupon?.couponId?.couponCard?.completed && (
                      <div className="ribbon">
                        <FaMedal />
                      </div>
                    )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5">
              <p>No Winner coupons</p>
            </div>
          )}
        </div>
        {/* Completed Coupons */}
        <div className="my-5">
          <p className="mb-2">Completed Coupons:-</p>
          {completedCoupons && completedCoupons.length ? (
            <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 place-items-center md:place-items-start">
              {completedCoupons.map((coupon, index) => (
                <div
                  key={index}
                  className="w-full max-w-72 min-h-20 relative h-fit p-4  bg-gray-300/50 rounded-xl shadow-xl bg-opacity-25"
                >
                  <p className="text-sm text-center">
                    <span className="text-base">
                      {coupon?.couponId?.couponCard?.name}
                    </span>{" "}
                  </p>
                  <p className="text-sm">ID :- {coupon?.couponId?._id}</p>
                  <p className="text-sm">
                    Price Money: {coupon?.couponId?.couponCard?.priceMoney} Rs
                  </p>
                  <p className="text-sm">
                    Premium: {coupon?.couponId?.couponCard?.premium} Rs
                  </p>
                  <p className="text-sm">
                    Start:{" "}
                    {new Date(
                      coupon?.couponId?.couponCard?.startDate
                    ).toLocaleString()}
                  </p>
                  <p className="text-sm">
                    End:{" "}
                    {new Date(
                      coupon?.couponId?.couponCard?.endDate
                    ).toLocaleString()}
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
                                <RiCloseFill
                                  size={18}
                                  className="text-red-500"
                                />
                              )}
                            </p>
                          )
                        )}
                      </div>
                    )}
                  {coupon?.couponId?.couponCard?.completed && (
                    <p className="text-sm text-center mt-2">
                      🎉Lucky Draw Completed🎉
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="p-5">
              <p>No Completed coupons</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
