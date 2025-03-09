import { useState, useRef } from "react";
import UserWallet from "../../assets/user-wallet.png";
import { IoIosArrowDown } from "react-icons/io";
import GpayPayment from "../../container/client/GpayPayment";

export default function Wallet(Props) {
  const { userData } = Props;
  const [activate, setActivate] = useState(false);
  const [showRecharge, setShowRecharge] = useState(false);
  const [amount, setAmount] = useState(0);
  const [amountEntered, setAmountEntered] = useState(false);
  const inputRef = useRef(null);
  return (
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
  );
}
