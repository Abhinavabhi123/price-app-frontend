import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UserAuth(Props) {
  const { children } = Props;
  const navigate = useNavigate();
  const location = useLocation().pathname;

  useEffect(() => {
    if (location === "/") {
      return navigate("/");
    }
    if (location === "/signUp") {
      return navigate("/signUp");
    }
    if (location === "/home") {
      return navigate("/home");
    }
    if (location === "/game") {
      return navigate("/game");
    }
    if (location === "/forgot") {
      return navigate("/forgot");
    }
    if (location === "/changePassword") {
      return navigate("/changePassword");
    }

    const token = localStorage.getItem("PrizeUserTkn");
    if (!token) {
      navigate("/login", { replace: true });
      return;
    }
  }, [navigate, location]);
  return <>{children}</>;
}
