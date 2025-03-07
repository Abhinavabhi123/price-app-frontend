import Header from "../../container/client/Header";
import BackGroundImage from "../../assets/colorful-background.jpg";
import { useEffect, useRef, useState } from "react";
import Loading from "../../components/Loading/Loading";
import { getUserDetails, userLogout } from "../../services/userApiServices";
import { jwtDecode } from "jwt-decode";
import UserProfileImage from "../../assets/userImage.png";
import UserWallet from "../../assets/user-wallet.png";
import { IoIosArrowDown } from "react-icons/io";
import GpayPayment from "../../container/client/GpayPayment";
import { RiLogoutCircleLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [activate, setActivate] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountEntered, setAmountEntered] = useState(false);
  const inputRef = useRef(null);
  // const [onSuccess, setOnSuccess] = useState(null);

  useEffect(() => {
    const token = jwtDecode(localStorage.getItem("PrizeUserTkn"));
    getUserDetails(token.id, setUserData, setLoading);
  }, []);

  if (loading) {
    return <Loading type="User" />;
  }

  return (
    <div className="w-screen h-dvh md:h-full overflow-x-hidden bg-primary-color pb-20">
      <Header />
      <div className="w-full h-28 md:h-48">
        <img
          src={BackGroundImage}
          alt="bg image"
          className="w-full h-full object-cover backdrop-blur-md"
        />
      </div>
      <div className="flex flex-col md:flex-row min-h-48 px-20">
        <div className="w-full md:w-2/6 relative">
          <div className="size-36 md:size-56 rounded-3xl">
            <div
              data-aos="zoom-in"
              className="size-36 md:size-56 rounded-3xl  bg-gray-500 backdrop-blur-md  absolute -top-20 left-[50%] -translate-x-[50%] md:left-[50%] "
            >
              <img
                src={userData.image ? userData.image : UserProfileImage}
                alt="user image"
                onError={(e) => (e.target.src = UserProfileImage)}
                className="w-full h-full object-cover rounded-3xl bg-white scale-90"
              />
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/6 h-fit pb-10 md:p-10 flex justify-center items-center">
          <div className="w-full h-full text-center md:text-left space-y-2">
            <p className="font-semibold text-xl">{userData?.name}</p>
            <div className="flex justify-center items-center md:justify-start">
              <button
                type="button"
                className="flex justify-center items-center gap-1 cursor-pointer"
                onClick={() => userLogout(navigate, dispatch)}
              >
                <RiLogoutCircleLine size={20} className="text-red-400" />
                <p className="text-sm text-red-400">Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <hr className="text-gray-400/50" />
      <div className="w-full p-10 space-y-5 md:px-28">
        <p className="text-xl">Wallet Details :-</p>
        <div className="flex flex-col md:flex-row gap-3 md:gap-0">
          <div className="w-full md:w-1/2 relative select-none">
            <div
              onClick={() => setActivate((prev) => !prev)}
              className="flex items-center justify-between bg-gray-400/50 rounded-lg px-5 cursor-pointer"
            >
              <img src={UserWallet} alt="user wallet" className="w-16" />
              <p>wallet</p>
              <div className="flex gap-2 items-center">
                <p>2000/-</p>
                <IoIosArrowDown size={20} className="text-white" />
              </div>
            </div>
            {activate && (
              <ul className="absolute select-none w-full max-h-40 border border-gray-300 rounded-md mt-1">
                <div className="flex justify-between items-center px-10 bg-gray-500 py-3">
                  <p>Total Amount</p>
                  <p>{userData?.wallet} /-</p>
                </div>
                <hr className="text-gray-400/50" />
                <div className="flex justify-between items-center px-10 bg-gray-500 py-3">
                  <p>Withdraw Amount</p>
                  <p>{userData?.withDrawAmount} /-</p>
                </div>
                <hr className="text-gray-400/50" />
                <div className="flex justify-between items-center px-10 bg-gray-500 py-3">
                  <p>Pending Amount</p>
                  <p>{userData?.pendingWalletAmount} /-</p>
                </div>
              </ul>
            )}
          </div>
          <div className="h-full md:min-h-52 w-full md:w-1/2 flex flex-col gap-3 justify-center items-center">
            <button
              className={`px-3 py-2 rounded-lg bg-white text-black cursor-pointer ${
                amountEntered && "mb-5"
              }`}
              onClick={() => setShowRecharge((prev) => !prev)}
            >
              Recharge Wallet
            </button>
            {showRecharge && (
              <div className="w-1/2 h-20  flex flex-col justify-center items-center gap-2 ">
                <input
                  type="number"
                  id="amount"
                  name="amount"
                  ref={inputRef}
                  placeholder="Enter wallet recharge amount"
                  className="w-full py-1 px-3 bg-gray-400 text-sm text-white outline-none rounded-lg border border-admin-active-color"
                  onChange={(e) => setAmount(e.target.value)}
                />
                {amount > 0 && (
                  <div className="flex justify-center items-center gap-3">
                    <button
                      className="px-2 py-1 rounded-md text-sm cursor-pointer text-white bg-gray-400/50"
                      onClick={() => {
                        setAmountEntered(false);
                        setAmount(0);
                        inputRef.current.value = "";
                      }}
                    >
                      Cancel
                    </button>
                    <button
                      className="px-3 py-1 text-sm rounded-md cursor-pointer text-white bg-admin-active-color"
                      onClick={() => setAmountEntered(true)}
                    >
                      Pay
                    </button>
                  </div>
                )}
                {amount > 0 && amountEntered && <GpayPayment />}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
