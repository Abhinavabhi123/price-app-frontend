import { Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import Loading from "../components/Loading/Loading";
import Authentication from "../utils/Authentication/AdminAuth";

// Lazy loading components
const LoginPage = lazy(() => import("../pages/admin/LoginPage"));
const Dashboard = lazy(() => import("../pages/admin/Dashboard"));
const LayoutWrapper = lazy(() =>
  import("../container/admin/Layout/LayoutWrapper")
);
const CardManagement = lazy(() => import("../pages/admin/CardManagement"));
const CreateCard = lazy(() => import("../pages/admin/CreateCard"));
const ImageManagement = lazy(() => import("../pages/admin/ImageManagement"));
const ArtManagement = lazy(() => import("../pages/admin/ArtManagement"));
const UserManagement = lazy(() => import("../pages/admin/UserManagement"));

export default function AdminRoutes() {
  return (
    <Suspense fallback={<Loading type="Admin" />}>
      <Authentication>
        <Routes>
          <Route path="/" element={<LoginPage />} />
          {/* <Routes> */}
          <Route element={<LayoutWrapper />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/cards" element={<CardManagement />} />
            <Route path="/createCard" element={<CreateCard />} />
            <Route path="/uploadImage" element={<ImageManagement />} />
            <Route path="/arts" element={<ArtManagement />} />
            <Route path="/users" element={<UserManagement />} />
          </Route>
          {/* </Routes> */}
        </Routes>
      </Authentication>
    </Suspense>
  );
}
