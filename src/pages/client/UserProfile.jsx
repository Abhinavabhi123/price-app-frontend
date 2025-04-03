import Header from "../../container/client/Header";
import BackGroundImage from "../../assets/colorful-background.jpg";
import { useEffect, useState } from "react";
// import Loading from "../../components/Loading/Loading";
import { getUserDetails, userLogout } from "../../services/userApiServices";
import { jwtDecode } from "jwt-decode";
import UserProfileImage from "../../assets/userImage.png";
import { MdOutlineEdit } from "react-icons/md";

import { RiLogoutCircleLine, RiAuctionLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import {
  IoWalletOutline,
  IoSettingsOutline,
  IoCloudUploadOutline,
} from "react-icons/io5";
import { BsCollection } from "react-icons/bs";
import Wallet from "../../container/client/Wallet";
import Settings from "../../container/client/Settings";
import ImageEditModal from "../../container/client/ImageEditModal";
import CardCollection from "../../container/client/CardCollection";
import Coupons from "../../container/client/Coupons";
import { IoTicketSharp } from "react-icons/io5";
import Auction from "../../container/client/Auction";

export default function UserProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState({});
  const [showProfileEditModal, setShowProfileEditModal] = useState(false);
  const [changed, setChanged] = useState(false);
  const [collectionData, setCollectionData] = useState([]);

  const [selected, setSelected] = useState("collections");

  const token = jwtDecode(localStorage.getItem("PrizeUserTkn"));
  useEffect(() => {
    if (token && token.id) {
      getUserDetails(token.id, setUserData, setCollectionData);
    }
  }, [changed, token.id]);

  return (
    <div className="w-screen h-dvh md:h-full overflow-x-hidden bg-primary-color pb-20">
      <ImageEditModal
        setShowModal={setShowProfileEditModal}
        isModalOpen={showProfileEditModal}
        setChanged={setChanged}
      />
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
          <div className="size-36 md:size-56 rounded-3xl ">
            <div
              data-aos="zoom-in"
              className="size-36 md:size-56 rounded-3xl overflow-hidden bg-gray-500 backdrop-blur-md  absolute -top-20 left-[50%] -translate-x-[50%] md:left-[50%] group"
            >
              <img
                src={`${import.meta.env.VITE_SERVER_URL}/uploads/userImage/${
                  userData.picture
                }`}
                alt="user image"
                onError={(e) => (e.target.src = UserProfileImage)}
                className="w-full h-full object-cover rounded-3xl bg-white scale-90"
              />
              <div
                className="w-full h-full opacity-0 transition-opacity duration-150 rounded-3xl ease-in group-hover:opacity-100 bg-black/50 cursor-pointer  absolute top-0 left-0 flex justify-center items-center transform  group-hover:scale-100"
                onClick={() => setShowProfileEditModal(true)}
              >
                <MdOutlineEdit size={20} />
              </div>
            </div>
          </div>
        </div>
        <div className="w-full md:w-4/6 h-fit pb-10 md:p-10 flex justify-center items-center">
          <div className="w-full h-full text-center md:text-left space-y-2">
            <p className="font-semibold text-xl">{userData?.name}</p>
            <p className=" text-lg">{userData?.email}</p>
            <p className=" text-lg">{userData?.mobile || ""}</p>
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
      <div className="w-full h-10  md:px-28 px-10">
        <div className="flex h-full items-center bg-gray-400/30 px-2 overflow-x-scroll scrollbar-hide">
          <div
            className={`flex items-center justify-center gap-2 border-x border-white px-5 cursor-pointer hover:text-blue-500 ${selected==="collections"&&"text-blue-500"}`}
            onClick={() => setSelected("collections")}
          >
            <BsCollection />
            <p>Collections</p>
          </div>
          <div
            className={`hidden md:flex items-center justify-center gap-2 border-x md:border-r px-5 cursor-pointer border-white hover:text-blue-500 ${selected==="wallet"&&"text-blue-500"}`}
            onClick={() => setSelected("wallet")}
          >
            <IoWalletOutline />
            <p>Wallet</p>
          </div>
          <div
            className={`hidden  items-center justify-center gap-2 border-r px-5 cursor-pointer border-white hover:text-blue-500 ${selected==="sellArt"&&"text-blue-500"}`}
            onClick={() => setSelected("sellArt")}
          >
            <IoCloudUploadOutline />
            <p>Sell Your Art</p>
          </div>
          <div
            className={`flex items-center justify-center gap-2 border-r px-5 cursor-pointer border-white hover:text-blue-500 ${selected==="coupons"&&"text-blue-500"}`}
            onClick={() => setSelected("coupons")}
          >
            <IoTicketSharp />
            <p>Coupons</p>
          </div>
          <div
            className={`flex items-center justify-center gap-2 border-r px-5 cursor-pointer border-white hover:text-blue-500 ${selected==="auction"&&"text-blue-500"}`}
            onClick={() => setSelected("auction")}
          >
            <RiAuctionLine size={20} />
            <p>Auction</p>
          </div>
          <div
            className={`flex items-center justify-center gap-2 border-r px-5 cursor-pointer border-white hover:text-blue-500 ${selected==="settings"&&"text-blue-500"}`}
            onClick={() => setSelected("settings")}
          >
            <IoSettingsOutline />
            <p>Settings</p>
          </div>
        </div>
      </div>
      {selected === "collections" && (
        <CardCollection collectionData={collectionData} />
      )}
      {selected === "coupons" && (
        <Coupons userData={userData} setSelected={setSelected} />
      )}
      {selected === "wallet" && <Wallet userData={userData} />}
      {selected === "auction" && <Auction userId={userData?._id} />}
      {selected === "settings" && (
        <Settings setChanged={setChanged} userData={userData} />
      )}
    </div>
  );
}
