import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icon.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import UserImage from "../../assets/userImage.png";
import MenuButton from "../../components/client/MenuButton";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";

export default function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);
  const token = localStorage.getItem("PrizeUserTkn");

  return (
    <header
      className={`w-full relative h-16 flex items-center justify-between px-10 md:px-20 lg:px-32 text-white sticky top-0 left-0 transition-all duration-300 z-40 backdrop-blur-lg border border-white/20 shadow-lg`}
    >
      {/* Left section */}
      <div>
        <img
          src={Logo}
          alt="Logo"
          className="size-10 cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      {/* Middle section */}
      <nav className="hidden md:block">
        <ul className="flex text-gray-500 font-medium gap-4">
          <li className="min-w-20 cursor-pointer flex items-center justify-center gap-2 transition-all divide-neutral-400 hover:text-white">
            Home
          </li>
          <li className="min-w-20 cursor-pointer flex items-center justify-center gap-2 transition-all divide-neutral-400 hover:text-white">
            About
          </li>
          <li className="min-w-20 cursor-pointer flex items-center justify-center gap-2 transition-all divide-neutral-400 hover:text-white">
            Cards
          </li>
          <li className="min-w-20 cursor-pointer flex items-center justify-center gap-2 transition-all divide-neutral-400 hover:text-white">
            Arts
          </li>
        </ul>
      </nav>
      {/* right section */}
      <div className="hidden md:flex gap-3">
        {!token && (
          <button
            type="button"
            className="px-5 py-2 rounded-full font-semibold text-sm cursor-pointer text-gray-400 hover:bg-gray-500/50"
            onClick={() => navigate("/login")}
          >
            Sign in
          </button>
        )}
        <button
          type="button"
          className="px-3 ps-4 py-2 rounded-full text-sm cursor-pointer font-semibold flex items-center justify-center gap-1 bg-white text-black"
        >
          Get Started
          <MdKeyboardArrowRight />
        </button>
        {token && (
          <div className="size-10 ms-2 cursor-pointer">
            <img
              src={user?.picture ? user.picture : UserImage}
              alt="user picture"
              onError={(e) => (e.target.src = UserImage)} // Handles broken image links
              className="rounded-full w-full h-full object-cover outline"
            />
          </div>
        )}
      </div>
      {/* mobile responsive menu bar */}
      <div className="md:hidden size-10 flex justify-center items-center">
        <MenuButton setShow={setShow} />
      </div>
      <div
        className={`md:hidden w-full h-[100vh] bg-red-500 absolute top-0 left-0  duration-300 p-5  transition-transform ${
          show ? "translate-x-0" : "translate-x-[110%]"
        } `}
      >
        <div className="w-full h-[5%]  flex justify-end relative">
          <IoMdClose
            size={25}
            className="text-white"
            onClick={() => setShow(false)}
          />
        </div>
        <div className="w-full h-[95%] bg-green-500">
          <ul>
            <li>Home</li>
            <li>About</li>
            <li>Games</li>
            <li>Arts</li>
          </ul>
        </div>
      </div>
    </header>
  );
}
