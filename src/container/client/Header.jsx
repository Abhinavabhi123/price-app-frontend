import { useLocation, useNavigate } from "react-router-dom";
import Logo from "../../assets/icon.svg";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useSelector } from "react-redux";
import UserImage from "../../assets/userImage.png";
import MenuButton from "../../components/client/MenuButton";
import { useState } from "react";
import { IoMdClose, IoMdWallet } from "react-icons/io";
import { IoHome } from "react-icons/io5";
import { RiDashboardHorizontalFill } from "react-icons/ri";
import { FaTicketAlt } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";

function NavLink(Props) {
  const { title, link, activeLink, setShow } = Props;
  const location = useLocation().pathname;
  const navigate = useNavigate();

  return (
    <li
      className={`w-full hover:bg-gray-400 py-2 rounded-lg backdrop-blur-md shadow-lg px-4 ${
        location === activeLink && "bg-gray-400"
      }`}
      onClick={() => {
        navigate(link);
        setShow(false);
      }}
    >
      {title}
    </li>
  );
}

export default function Header() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const user = useSelector((state) => state.user);
  const location = useLocation().pathname;
  const token = localStorage.getItem("PrizeUserTkn");

  return (
    <header
      className={`w-full  h-16 flex items-center justify-between px-10 md:px-20 lg:px-32 text-white sticky top-0 left-0 transition-all duration-300 z-40 backdrop-blur-lg border border-white/20 shadow-lg`}
    >
      {/* Left section */}
      <div>
        <img
          src={Logo}
          alt="Logo"
          className="size-10 hidden md:flex cursor-pointer"
          onClick={() => navigate("/")}
        />
      </div>
      {/* Middle section */}
      <nav className="hidden md:block">
        <ul className="flex text-gray-500 font-medium gap-4">
          <li
            className={`min-w-20 cursor-pointer flex items-center justify-center gap-2 transition-all divide-neutral-400 hover:text-white ${
              location === "/home" && "text-white"
            }`}
            onClick={() => navigate("/home")}
          >
            Home
          </li>
          <li
            className={`min-w-20 cursor-pointer flex items-center justify-center gap-2 transition-all divide-neutral-400 hover:text-white ${
              location === "/about" && "text-white"
            }`}
            onClick={() => navigate("/about")}
          >
            About
          </li>
          <li
            className={`min-w-20 cursor-pointer flex items-center justify-center gap-2 transition-all divide-neutral-400 hover:text-white ${
              location === "/" && "text-white"
            }`}
            onClick={() => navigate("/")}
          >
            Cards
          </li>
          <li
            className={`min-w-20 cursor-pointer flex items-center justify-center gap-2 transition-all divide-neutral-400 hover:text-white ${
              location === "/auctions" && "text-white"
            }`}
            onClick={() => navigate("/auctions")}
          >
            Auctions
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
          onClick={() => navigate("/home")}
        >
          Get Started
          <MdKeyboardArrowRight />
        </button>
        {token && (
          <div className="size-10 ms-2 cursor-pointer">
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/uploads/userImage/${
                user?.picture
              }`}
              alt="user picture"
              onError={(e) => (e.target.src = UserImage)} // Handles broken image links
              className="rounded-full w-full h-full object-cover outline"
              onClick={() => navigate("/profile")}
            />
          </div>
        )}
      </div>
      {/* mobile responsive menu bar */}
      {/* flex */}
      <div className="hidden md:hidden size-10  justify-center items-center">
        <MenuButton setShow={setShow} show={show} />
      </div>
      <div
        className={`hidden md:hidden w-full h-[100vh] bg-primary-color absolute top-0 left-0  duration-300 p-5  transition-transform ${
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
        <div className="w-full h-[95%] overflow-y-scroll ">
          <ul>
            <NavLink
              title="Home"
              link="/home"
              activeLink="home"
              setShow={setShow}
            />
            <NavLink
              title="About"
              link="/about"
              activeLink="about"
              setShow={setShow}
            />
            <NavLink title="Cards" link="/" activeLink="/" setShow={setShow} />
            {token ? (
              <NavLink
                title="Profile"
                link="/profile"
                activeLink="profile"
                setShow={setShow}
              />
            ) : (
              <NavLink
                title="Login"
                link="/login"
                activeLink="login"
                setShow={setShow}
              />
            )}
          </ul>
        </div>
      </div>
      {/* mobile responsive design modified */}
      <div className="w-full h-fit flex md:hidden justify-between items-center">
        <div>
          <IoHome
            size={20}
            onClick={() => navigate("/home")}
            className={`${
              location === "/home" ? "text-blue-500" : "text-white"
            }`}
          />
        </div>
        <div>
          <RiDashboardHorizontalFill
            size={20}
            onClick={() => navigate("/")}
            className={`${location === "/" ? "text-blue-500" : "text-white"}`}
          />
        </div>
        <div>
          <IoMdWallet
            size={20}
            onClick={() => navigate("/wallet")}
            className={`${
              location === "/wallet" ? "text-blue-500" : "text-white"
            }`}
          />
        </div>
        <div>
          <FaTicketAlt
            size={20}
            onClick={() => navigate("/auctions")}
            className={`${
              location === "/auctions" ? "text-blue-500" : "text-white"
            }`}
          />
        </div>
        <div>
          {token ? (
            <FaRegCircleUser
              size={20}
              onClick={() => navigate("/profile")}
              className={`${
                location === "/profile" ? "text-blue-500" : "text-white"
              }`}
            />
          ) : (
            <FaRegCircleUser size={20} onClick={() => navigate("/login")} />
          )}
        </div>
      </div>
    </header>
  );
}
