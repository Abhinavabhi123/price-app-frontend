import Icon from "../../../assets/icon.svg";
import ProfileImage from "../../../assets/prize-profile-image.jpg";
import { VscBellDot } from "react-icons/vsc";
import { MdOutlineMessage } from "react-icons/md";
import { LogoutOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";
import { IoClose } from "react-icons/io5";
import { useState } from "react";
import { Navlink } from "./SideBar";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa6";
import { ImFilePicture } from "react-icons/im";
import MenuButton from "../../../components/client/MenuButton";

export default function TopBar() {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("prizeAdminTkn");
    navigate("/admin");
  };

  function closeMenu() {
    setShow(false);
  }

  const items = [
    {
      key: "1",
      label: "My Account",
      disabled: true,
    },
    {
      type: "divider",
    },
    {
      key: "4",
      label: <span style={{ color: "red" }}>Logout</span>,
      icon: <LogoutOutlined style={{ color: "red" }} />,
      onClick: handleLogout,
    },
  ];

  return (
    <div className="w-full h-full max-w-[100vw] overflow-hidden bg-admin-active-color flex justify-center items-center px-6 md:px-10">
      <div className=" w-full flex justify-between items-center">
        <div className="w-fit">
          <img src={Icon} alt="icon" className="size-8 md:size-10" />
        </div>
        <div className="flex gap-4">
          <div className="size-8 hidden md:size-10 bg-admin-secondary-color rounded-md cursor-pointer drop-shadow-xl  justify-center items-center">
            <MdOutlineMessage size={18} className="text-gray-400" />
          </div>
          <div className="size-8 hidden md:size-10 bg-admin-secondary-color rounded-md cursor-pointer drop-shadow-xl  justify-center items-center">
            <VscBellDot className="text-gray-400" size={20} />
          </div>
          <div className=" bg-admin-secondary-color rounded-md ms-4 cursor-pointer overflow-hidden drop-shadow-xl">
            <div>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a className="size-20" onClick={(e) => e.preventDefault()}>
                  <img
                    src={ProfileImage}
                    alt="profile image"
                    className="size-8 md:size-10 object-cover"
                  />
                </a>
              </Dropdown>
            </div>
          </div>
          <div className="md:hidden">
            <MenuButton setShow={setShow} show={show} />
          </div>
          <div
            className={`md:hidden w-full h-full bg-admin-primary-color fixed top-0 left-0  duration-300 p-5  transition-transform z-50 ${
              show ? "translate-x-0" : "translate-x-[110%]"
            } `}
          >
            <div className="w-full h-[5%]  flex justify-end relative">
              <IoClose
                size={25}
                className="text-white"
                onClick={() => setShow(false)}
              />
            </div>
            <div className="w-full h-[95%] relative">
              <ul className="space-y-2">
                <Navlink
                  title="Dashboard"
                  link="/admin/dashboard"
                  activeLink="dashboard"
                  icon={<RxDashboard size={20} className="text-white" />}
                  closeMenu={closeMenu}
                />
                <hr className="text-gray-400" />
                <Navlink
                  title="Users Management"
                  link="/admin/users"
                  activeLink="users"
                  icon={<FaUsers size={20} className="text-white" />}
                  closeMenu={closeMenu}
                />
                <Navlink
                  title="Card Management"
                  link="/admin/cards"
                  activeLink="cards"
                  icon={<TbCards size={25} className="text-white" />}
                  closeMenu={closeMenu}
                />
                <Navlink
                  title="Upload Card Image"
                  link="/admin/uploadImage"
                  activeLink="uploadImage"
                  icon={<FaRegImages size={20} className="text-white" />}
                  closeMenu={closeMenu}
                />
                <Navlink
                  title="Arts"
                  link="/admin/arts"
                  activeLink="arts"
                  icon={<ImFilePicture size={18} className="text-white" />}
                  closeMenu={closeMenu}
                />
                <hr className="text-gray-400" />
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
