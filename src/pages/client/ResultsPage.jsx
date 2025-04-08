import { useEffect, useState } from "react";
import Header from "../../container/client/Header";
import { getWinners } from "../../services/userApiServices";
import Footer from "../../container/client/Footer";

export default function ResultsPage() {
  const [winners, setWinners] = useState([]);
  useEffect(() => {
    getWinners(setWinners);
  }, []);

  return (
    <div className="w-screen min-h-[100vh] bg-primary-color">
      <Header />
      <div className="py-10 px-10 md:px-28">
        <p>Lucky Draw winners</p>
        <div className="min-h-[80vh] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-5">
          {winners && winners.length > 0 ? (
            winners.map((winner, index) => (
              <div
                key={index}
                className="w-full min-h-28 h-fit bg-gradient-to-r from-[#00A7FF] to-[#EE82EE] rounded-lg p-4 border-2 border-blue-400"
              >
                <p className="text-center text-sm md:text-base">
                  Lucky draw : {winner?.name?.name}
                </p>
                <p className="text-[#FFD700]">
                  Winner : {winner?.winnerCoupon?.userId?.name}
                </p>
                <p>Prize Money : {winner?.priceMoney} Rs</p>
                <p className="text-sm">
                  Date :{new Date(winner.endDate).toLocaleString()}
                </p>
              </div>
            ))
          ) : (
            <div className="flex justify-center items-center h-full ">
              <p className="text-gray-500 font-semibold">No winners found </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
