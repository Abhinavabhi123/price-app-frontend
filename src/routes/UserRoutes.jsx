import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/client/LandingPage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage/>} />
    </Routes>
  );
}
