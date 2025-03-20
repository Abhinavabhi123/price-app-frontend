import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading/Loading";
import UserAuth from "../utils/Authentication/UserAuth";
import ForgetPassword from "../pages/client/ForgetPassword";
import ChangePassword from "../pages/client/ChangePassword";

const LandingPage = lazy(() => import("../pages/client/LandingPage"));
const UserProfile = lazy(() => import("../pages/client/UserProfile"));
const LoginPage = lazy(() => import("../pages/client/LoginPage"));
const Game = lazy(() => import("../pages/client/Game"));
const SignUpPage = lazy(() => import("../pages/client/SignUpPage"));
const AboutPage = lazy(() => import("../pages/client/AboutPage"));
const WalletPage = lazy(() => import("../pages/client/WalletPage"));

export default function UserRoutes() {
  return (
    <Suspense fallback={<Loading type="User" />}>
      <UserAuth>
        <Routes>
          <Route path="/" element={<Game />} />
          <Route path="/signUp" element={<SignUpPage />} />
          <Route path="/home" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/forgot" element={<ForgetPassword />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/wallet" element={<WalletPage/>} />
        </Routes>
      </UserAuth>
    </Suspense>
  );
}
