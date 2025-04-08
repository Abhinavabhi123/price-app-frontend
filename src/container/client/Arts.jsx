import { useEffect, useRef, useState } from "react";
import { checkAnswer, purchaseArt } from "../../services/userApiServices";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { TiTick } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function Arts(Props) {
  const { card, setCardData, cardData, nextCard } = Props;
  const navigate = useNavigate();
  const [answer, setAnswer] = useState("");
  const inputRef = useRef(null);
  const [isSubmitting, setSubmitting] = useState(false);
  const [changed, setChanged] = useState(false);
  const [purchasing, setPurchasing] = useState(false);

  useEffect(() => {
    setCardData((prev) =>
      prev.map((item) =>
        item?._id == card?._id
          ? { ...item, quantity: 0, isAnswered: false }
          : item
      )
    );
    if (inputRef.current.value) {
      inputRef.current.value = "";
    }
  }, [changed, card?._id, setCardData]);

  function handleAnswerCheck() {
    if (answer.length > 0) {
      setSubmitting(true);
      checkAnswer(
        answer,
        card?.name?._id,
        setCardData,
        setSubmitting,
        card?._id
      );
    }
  }

  // Function to increment quantity of the art
  function incrementQty(id) {
    setCardData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 0) + 1 } : item
      )
    );
  }

  //   Function to decrement quantity of the art
  function decrementQty(id) {
    setCardData((prev) =>
      prev.map((item) =>
        item._id === id ? { ...item, quantity: (item.quantity || 0) - 1 } : item
      )
    );
  }

  // function to purchase the art
  function purchaseHandler(card) {
    const token = localStorage.getItem("PrizeUserTkn");
    if (!token) {
      navigate("/login");
    } else {
      const userId = jwtDecode(token);
      setPurchasing(true);
      purchaseArt(card, userId.id, setChanged, setPurchasing);
    }
  }

  return (
    <div
      className={`w-full h-[38rem] md:h-[28rem] relative bg-[#6932CF] bg-gradient-to-br from-[#641beb] to-[#9618CF] rounded-xl p-2 ${
        nextCard &&
        nextCard._id === cardData._id &&
        "outline-4 outline-teal-500/80"
      } 
      ${card.isStarted === true && "outline-4 outline-[#D7334E]"}
      `}
    >
      {nextCard && nextCard._id === cardData._id && (
        <div
          className="absolute bottom-[100.6%] md:bottom-[100.9%] translate-x-[-50%] left-[50%] w-[80%] h-5 bg-teal-500/80  rounded-t-md
          text-center"
        >
          <p className="text-white text-xs mt-1">Next lucky draw art </p>
        </div>
      )}
      {card.isStarted === true && (
        <div
          className="absolute bottom-[100.9%] translate-x-[-50%] left-[50%] w-[80%] h-5 bg-[#D7334E] rounded-t-md
          text-center"
        >
          <p className="text-white text-xs mt-1">Current lucky draw art</p>
        </div>
      )}

      <div className="w-full h-full ">
        <div className="w-full h-[40%] cursor-pointer bg-white overflow-hidden rounded-t-xl ">
          <img
            src={`${import.meta.env.VITE_SERVER_URL}/uploads/arts/${
              card?.name?.image
            }`}
            alt="art image"
            className="w-full h-full object-cover"
          />
        </div>
        <hr />
        <div className="w-full h-[60%] md:text-xs py-2 flex flex-col justify-between">
          <div>
            <p className="w-full truncate">Name :{card?.name?.name}</p>
            <p>Price : {card?.name?.price} /-</p>
            {/* Quantity section */}
            <div className="flex w-full justify-between items-center">
              <p>Quantity</p>
              <div className="flex  bg-admin-active-color overflow-hidden gap-3 rounded-lg">
                <button
                  disabled={card?.quantity <= 1 || card?.quantity == 0}
                  className={`border-r px-2 py-1 border-admin-primary-color pe-2 cursor-pointer ${
                    card?.quantity <= 1 || card?.quantity == 0
                      ? "opacity-50 cursor-not-allowed"
                      : ""
                  }`}
                  onClick={() => decrementQty(card._id)}
                >
                  <FaMinus />
                </button>
                <p className="select-none p-1 ">
                  {card?.quantity ? card?.quantity : 0}
                </p>
                <button
                  className="border-l  px-2 py-1  border-admin-primary-color ps-2 cursor-pointer"
                  onClick={() => incrementQty(card._id)}
                >
                  <FaPlus />
                </button>
              </div>
            </div>
            <div className="flex flex-col gap-1">
              <p className="">Question : {card?.name?.question}</p>
              <div className="flex gap-1">
                <input
                  type="text"
                  name="answer"
                  id="answer"
                  ref={inputRef}
                  disabled={card.isAnswered}
                  placeholder="Enter answer"
                  onChange={(e) => setAnswer(e.target.value)}
                  className="w-full px-2 py-1 rounded-md border bg-white text-black border-black outline-none"
                />
                <button
                  disabled={isSubmitting || card.isAnswered}
                  className="text-xs px-2 py-1 w-20 flex justify-center items-center bg-gray-500 rounded-lg cursor-pointer"
                  onClick={handleAnswerCheck}
                >
                  {card.isAnswered ? (
                    <TiTick size={20} className="text-green-500" />
                  ) : (
                    "Check"
                  )}
                </button>
              </div>
            </div>
            {/* {answer.length === 0 && !art.isAnswered && (
              <p className="text-[10px] text-red-400">
                Please answer the question to get the coupon
              </p>
            )} */}
          </div>
          {/* show card details */}
          <div className="">
            <p>Lucky draw details:-</p>
            <p className=" md:text-[10px]">Name : {card?.name?.name}</p>
            <p className=" md:text-[10px]">Prize : {card?.priceMoney}/-</p>
            {card.quantity > 0 && card.isAnswered && (
              <p className="text-[10px] font-semibold text-green-500">
                You will get {card.quantity} coupons after purchasing this art.
              </p>
            )}
          </div>
          <div>
            <p className="text-center py-1">
              Total : {card?.name?.price * card.quantity || 0}/-
            </p>
            <div className="flex justify-center">
              <button
                disabled={card.quantity <= 0 || !card.isAnswered || purchasing}
                className={`px-4 py-1 rounded-lg outline-none bg-white text-black  ${
                  card.quantity <= 0 || !card.isAnswered
                    ? "opacity-50 cursor-not-allowed"
                    : "cursor-pointer"
                }`}
                onClick={() => purchaseHandler(card)}
              >
                Buy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
