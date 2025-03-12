import { MdOutlineSignalCellularAlt } from "react-icons/md";
import { HiOutlineDocumentCurrencyDollar } from "react-icons/hi2";
import { FiArrowUpRight } from "react-icons/fi";
import { GoArrowDownLeft } from "react-icons/go";
import { AiOutlineDollar } from "react-icons/ai";
import { useEffect, useState } from "react";
import { getDashboardData } from "../../services/adminApiServices";
import UserImage from "../../assets/userImage.png";
import { MdOutlineShowChart } from "react-icons/md";
import { MdOutlineTrendingDown } from "react-icons/md";

export default function Dashboard() {
  const [userData, setUserData] = useState([]);
  const [userArtData, setUserArtData] = useState([]);
  const [dashData, setDashData] = useState({});

  useEffect(() => {
    getDashboardData(setUserData, setUserArtData, setDashData);
  }, []);

  return (
    <div className="w-screen h-full flex flex-col overflow-y-scroll ">
      <div className="w-full h-fit md:h-1/2 flex flex-col md:flex-row">
        <div className="w-fit h-full p-10">
          <p className="font-semibold text-lg leading-9">Wallet Summery</p>
          {/* top row */}
          <div className="mt-3">
            <div className="flex gap-10">
              <div className="bg-[#26273B] min-w-36 rounded-lg  shadow-gray-800 shadow-lg flex justify-between items-center py-2 px-5 gap-5">
                <div className="p-1 rounded-full border-4 border-orange-500 border-l-gray-300/50 shadow-md shadow-orange-500/40">
                  <FiArrowUpRight size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Outcome</p>
                  <p className="text-sm flex items-center gap-1">
                    <AiOutlineDollar size={15} />
                    20000
                  </p>
                </div>
              </div>
              <div className="bg-[#26273B] rounded-lg min-w-36 shadow-gray-800 shadow-lg flex justify-between items-center py-2 px-5 gap-5">
                <div className="p-1 rounded-full border-4 border-blue-600 border-l-gray-300/50 shadow-md shadow-blue-600/40">
                  <GoArrowDownLeft size={20} />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Income</p>
                  <p className="text-sm flex items-center gap-1">
                    <AiOutlineDollar size={15} />
                    20000
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-3 mt-8">
            <div className="flex gap-10">
              {" "}
              <div className=" min-w-36 rounded-lg flex justify-between items-center py-2 px-5 gap-5">
                <div className="w-fit h-fit rounded-lg bg-green-500/10 p-2 shadow-sm shadow-green-500">
                  <MdOutlineSignalCellularAlt
                    size={20}
                    className="text-green-600"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Premium</p>
                  <p className="text-sm flex items-center gap-1">
                    <AiOutlineDollar size={15} />
                    20000
                  </p>
                </div>
              </div>{" "}
              <div className="min-w-36 rounded-lg flex justify-between items-center py-2 px-5 gap-5">
                <div className="w-fit h-fit rounded-lg bg-orange-500/10 shadow-sm shadow-orange-500 p-2">
                  <HiOutlineDocumentCurrencyDollar
                    size={20}
                    className="text-orange-500"
                  />
                </div>
                <div>
                  <p className="text-[10px] text-gray-400">Art </p>
                  <p className="text-sm flex items-center gap-1">
                    <AiOutlineDollar size={15} />
                    20000
                  </p>
                </div>
              </div>
            </div>
            <div className="flex gap-10">
              {" "}
              <div className=" min-w-36 rounded-lg flex justify-between items-center py-2 px-5 gap-5">
                <div className="w-fit h-fit rounded-lg bg-green-500/10 shadow-sm shadow-green-500 p-2">
                  <MdOutlineShowChart size={20} className="text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Profit</p>
                  <p className="text-sm">20000</p>
                </div>
              </div>{" "}
              <div className="min-w-36 rounded-lg flex md:ms-4 justify-between items-center py-2 px-5 gap-5">
                <div className="w-fit h-fit rounded-lg bg-orange-500/10 shadow-sm shadow-orange-500 p-2">
                  <MdOutlineTrendingDown
                    size={20}
                    className="text-orange-500"
                  />
                </div>
                <div>
                  <p className="text-xs text-gray-400">Loss</p>
                  <p className="text-sm">20000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full  ps-10 pt-5 pe-20">
          <p>Totals</p>
          <div className="grid grid-cols-4 md:grid-cols-8 gap-4 md:gap-0 h-[40rem] md:h-full py-3">
            <div className="w-14 rounded-full bg-purple-500 py-5 shadow-2xl shadow-purple-500 flex flex-col justify-between items-center">
              <p className="-rotate-90 text-xs mt-3">Cards</p>
              <p>{dashData?.cards}</p>
            </div>
            <div className="w-14 rounded-full bg-purple-500 py-5 shadow-2xl shadow-purple-500 flex flex-col justify-between items-center">
              <p className="-rotate-90 text-xs mt-12 w-36 text-center">
                Completed Cards
              </p>
              <p>{dashData?.completedCards}</p>
            </div>
            <div className="w-14 rounded-full bg-purple-500 py-5 shadow-2xl shadow-purple-500 flex flex-col justify-between items-center">
              <p className="-rotate-90 text-xs mt-3">Arts</p>
              <p>{dashData?.arts}</p>
            </div>
            <div className="w-14 rounded-full bg-purple-500 py-5 shadow-2xl shadow-purple-500 flex flex-col justify-between items-center">
              <p className="-rotate-90 text-xs mt-5">Coupons</p>
              <p>{dashData?.coupons}</p>
            </div>
            <div className="w-14 rounded-full bg-purple-500 py-5 shadow-2xl shadow-purple-500  flex flex-col justify-between items-center">
              <p className="-rotate-90 text-xs mt-3">Users</p>
              <p>{dashData?.users}</p>
            </div>

            <div className="w-14 rounded-full bg-purple-500 py-5 shadow-2xl shadow-purple-500 flex flex-col justify-between items-center">
              <p className="-rotate-90 text-xs mt-3">Cards</p>
              <p>5</p>
            </div>

            <div className="w-14 rounded-full bg-purple-500 py-5 shadow-2xl shadow-purple-500  flex flex-col justify-between items-center">
              <p className="-rotate-90 text-xs mt-3">Cards</p>
              <p>5</p>
            </div>
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row mb-10 mt-10">
        <div className="w-full md:w-[75%] h-full  py-10 md:px-5">
          <div className="overflow-x-auto rounded-box border bg-transparent border-base-content/5 ">
            <table className="table">
              {/* head */}
              <thead>
                <tr className="text-center">
                  <th>Si No.</th>
                  <th>Name</th>
                  <th>Image</th>
                  <th>Total Coupon</th>
                  <th>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {userData &&
                  userData.map((user, index) => (
                    <tr key={index} className="text-center">
                      <td>{index + 1}</td>
                      <td>{user?.name}</td>
                      <td>
                        <img
                          src={
                            user.picture?.startsWith("http")
                              ? user.picture
                              : `${
                                  import.meta.env.VITE_SERVER_URL
                                }/uploads/userImage/${user.picture}`
                          }
                          alt="User"
                          onError={(e) => {
                            e.target.src = UserImage;
                          }}
                          className="size-10 rounded-full"
                        />
                      </td>
                      <td>{user?.coupons.length}</td>
                      <td>{user?.total_amount}</td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-full h-full px-2">
          <div className="w-full md:w-[75%] h-full  py-10 md:px">
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-transparent">
              <table className="table ">
                {/* head */}
                <thead>
                  <tr className="text-center">
                    <th>Si No.</th>
                    <th>Name</th>
                    <th>Image</th>
                    <th>Total Art</th>
                  </tr>
                </thead>
                <tbody>
                  {userArtData &&
                    userArtData.map((user, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{user?.name}</td>
                        <td>
                          <img
                            src={
                              user.picture?.startsWith("http")
                                ? user.picture
                                : `${
                                    import.meta.env.VITE_SERVER_URL
                                  }/uploads/userImage/${user.picture}`
                            }
                            alt="User"
                            onError={(e) => {
                              e.target.src = UserImage;
                            }}
                            className="size-10 rounded-full"
                          />
                        </td>
                        <td>{user?.purchasedArts.length}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
