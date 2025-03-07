import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading/Loading";
import UserAuth from "../utils/Authentication/UserAuth";

const LandingPage = lazy(() => import("../pages/client/LandingPage"));
const UserProfile = lazy(() => import("../pages/client/UserProfile"));
const LoginPage = lazy(() => import("../pages/client/LoginPage"));
const Game = lazy(() => import("../pages/client/Game"));
const SignUpPage = lazy(() => import("../pages/client/SignUpPage"));

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
        </Routes>
      </UserAuth>
    </Suspense>
  );
}
