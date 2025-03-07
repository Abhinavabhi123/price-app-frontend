import { useLocation, useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa6";
import { ImFilePicture } from "react-icons/im";

export function Navlink(Props) {
  const { title, activeLink, link, icon,closeMenu=(()=>{}) } = Props;
  const navigate = useNavigate();
  const location = useLocation().pathname;
  const pathName = location.split("/")[location.split("/").length - 1];

  return (
    <li
      className={`w-full ${
        pathName === activeLink && "bg-admin-active-color"
      } p-2 rounded-lg cursor-pointer text-sm flex items-center gap-1 hover:bg-admin-active-color`}
      onClick={() => {
        navigate(link);
        closeMenu()
      }}
    >
      {icon}
      <p className="w-full truncate">{title}</p>
    </li>
  );
}

export default function SideBar() {
  // const navigate = useNavigate();

  return (
    <div className="hidden min-[600px]:block w-full h-full overflow-y-scroll py-5 px-3 text-white admin-scrollbar">
      <ul className="space-y-2">
        <Navlink
          title="Dashboard"
          link="/admin/dashboard"
          activeLink="dashboard"
          icon={<RxDashboard size={20} className="text-white" />}
        />
        <hr className="text-gray-400" />
        <Navlink
          title="Users Management"
          // link="/admin/users"
          // activeLink="users"
          icon={<FaUsers size={20} className="text-white" />}
        />
        <Navlink
          title="Card Management"
          link="/admin/cards"
          activeLink="cards"
          icon={<TbCards size={25} className="text-white" />}
        />
        <Navlink
          title="Upload Card Image"
          link="/admin/uploadImage"
          activeLink="uploadImage"
          icon={<FaRegImages size={20} className="text-white" />}
        />
        <Navlink
          title="Arts"
          link="/admin/arts"
          activeLink="arts"
          icon={<ImFilePicture size={18} className="text-white" />}
        />
        <hr className="text-gray-400" />
      </ul>
    </div>
  );
}
