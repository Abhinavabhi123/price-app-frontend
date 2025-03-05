import { useNavigate } from "react-router-dom";
import { RxDashboard } from "react-icons/rx";
import { FaUsers } from "react-icons/fa";
import { TbCards } from "react-icons/tb";
import { FaRegImages } from "react-icons/fa6";

export default function SideBar() {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full overflow-y-scroll py-5 px-3 text-white admin-scrollbar">
      <ul className="space-y-2">
        <li className="w-full bg-admin-active-color p-2 rounded-lg cursor-pointer text-sm flex items-center gap-1">
          <RxDashboard size={20} className="text-white" />
          <p className="w-full truncate">Dashboard</p>
        </li>
        <hr className="text-gray-400" />
        <li className="w-full  hover:bg-admin-active-color p-2 rounded-lg cursor-pointer text-sm flex items-center gap-1">
          <FaUsers size={20} className="text-white" />
          <p className="w-full truncate">Users Management</p>
        </li>
        <li
          className="w-full  hover:bg-admin-active-color p-2 rounded-lg cursor-pointer text-sm flex items-center gap-1"
          onClick={() => navigate("/admin/cards")}
        >
          <TbCards size={25} className="text-white" />
          <p className="w-full truncate">Card Management</p>
        </li>
        <li
          className="w-full  hover:bg-admin-active-color p-2 rounded-lg cursor-pointer text-sm flex items-center gap-1"
          onClick={() => navigate("/admin/uploadImage")}
        >
          <FaRegImages size={20} className="text-white" />
          <p className="w-full truncate"> Upload Card Image</p>
        </li>
        <hr className="text-gray-400" />
        <li className="hover:bg-admin-active-color p-2 rounded-lg cursor-pointer"></li>
      </ul>
    </div>
  );
}
