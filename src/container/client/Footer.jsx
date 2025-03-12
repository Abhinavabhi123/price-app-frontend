import { useNavigate } from "react-router-dom";
import Logo from "../../assets/icon.svg";
export default function Footer() {
  const navigate = useNavigate();

  return (
    <div className="w-full bg-slate-900 h-fit md:h-72 py-3 md:px-10">
      <div className="flex h-fit md:h-[80%] flex-col md:flex-row">
        <div className="hidden md:flex w-full h-full justify-center items-center">
          <img src={Logo} alt="logo" />
        </div>
        <div className=" w-full h-full flex flex-col">
          <div className="w-full">
            <p className="text-3xl font-semibold p-4">Website Name</p>
          </div>
          <div className="w-full px-8 flex flex-col md:flex-row gap-5 ">
            <div>
              <ul className="min-w-36">
                <li className="mb-2 font-semibold">Pages</li>
                <li
                  className="text-sm cursor-pointer relative"
                  onClick={() => navigate("/home")}
                >
                  Home
                </li>
                <li
                  className="text-sm cursor-pointer relative"
                  onClick={() => navigate("/")}
                >
                  Cards
                </li>
                <li
                  className="text-sm cursor-pointer relative"
                  onClick={() => navigate("/Profile")}
                >
                  Profile
                </li>
              </ul>
            </div>
            <div>
              <ul className="min-w-36">
                <li className="mb-2 font-semibold">About Us</li>
                <li
                  className="text-sm cursor-pointer relative"
                  onClick={() => navigate("/about")}
                >
                  About Us
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-10 mt-3 px-4 md:px-20 text-xs text-gray-400">
        <div className=" border-t border-gray-400 w-full  py-5">helllo</div>
      </div>
    </div>
  );
}
