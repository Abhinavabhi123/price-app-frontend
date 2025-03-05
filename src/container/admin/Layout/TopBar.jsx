import Icon from "../../../assets/icon.svg";
import ProfileImage from "../../../assets/prize-profile-image.jpg";
import { VscBellDot } from "react-icons/vsc";
import { MdOutlineMessage } from "react-icons/md";
import { LogoutOutlined } from "@ant-design/icons";
import { Dropdown } from "antd";
import { useNavigate } from "react-router-dom";

export default function TopBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("prizeAdminTkn");
    navigate("/admin");
  };

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
    <div className="w-full h-full bg-admin-active-color flex justify-center items-center px-10">
      <div className=" w-full flex justify-between items-center">
        <div className="w-fit">
          <img src={Icon} alt="icon" className="size-10" />
        </div>
        <div className="flex gap-4">
          <div className="size-10 bg-admin-secondary-color rounded-md cursor-pointer drop-shadow-xl flex justify-center items-center">
            <MdOutlineMessage size={18} className="text-gray-400" />
          </div>
          <div className="size-10 bg-admin-secondary-color rounded-md cursor-pointer drop-shadow-xl flex justify-center items-center">
            <VscBellDot className="text-gray-400" size={20} />
          </div>
          <div className=" bg-admin-secondary-color rounded-md ms-4 cursor-pointer overflow-hidden drop-shadow-xl">
            <div>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a className="size-20" onClick={(e) => e.preventDefault()}>
                  <img
                    src={ProfileImage}
                    alt="profile image"
                    className="size-10 object-cover"
                  />
                </a>
              </Dropdown>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
