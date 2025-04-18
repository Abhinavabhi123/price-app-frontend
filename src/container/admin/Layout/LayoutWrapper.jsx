import { Outlet } from "react-router-dom";

import SideBar from "./SideBar";
import TopBar from "./TopBar";

export default function LayoutWrapper() {
  return (
    <div className="w-screen h-dvh overflow-hidden bg-admin-primary-color">
      <div className="w-full min-h-16 h-[10%]">
        <TopBar />
      </div>
      <div className="w-full h-[90%] flex">
        <div className="w-0 md:w-[15%] max-h-[95vh] bg-admin-secondary-color">
          <SideBar />
        </div>
        <div className="w-full overflow-hidden min-[755px]:w-[85%] h-full bg-admin-primary-color">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
