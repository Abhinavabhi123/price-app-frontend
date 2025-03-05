import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function Authentication(Props) {
  const { children } = Props;
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    const token = localStorage.getItem("prizeAdminTkn");

    if (!token) {
      navigate("/admin", { replace: true });
      return;
    }

    if (location === "/admin") {
      navigate("/admin/dashboard", { replace: true });
    }

  }, [navigate, location]);

  return <>{children}</>;
}
