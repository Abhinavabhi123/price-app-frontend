import { Routes, Route } from "react-router-dom";
import LandingPage from "../pages/client/LandingPage";
import LoginPage from "../pages/client/LoginPage";

export default function UserRoutes() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<LoginPage />} />
    </Routes>
  );
}
