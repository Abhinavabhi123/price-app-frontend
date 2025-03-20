import { useEffect, useState } from "react";
import Footer from "../../container/client/Footer";
import Header from "../../container/client/Header";
import Wallet from "../../container/client/Wallet";
import { getUserDetails } from "../../services/userApiServices";
import { jwtDecode } from "jwt-decode";

export default function WalletPage() {
  const [userData, setUserData] = useState({});

  const token = jwtDecode(localStorage.getItem("PrizeUserTkn"));
  useEffect(() => {
    if (token && token.id) {
      getUserDetails(token.id, setUserData);
    }
  }, []);
  return (
    <div className="w-full h-dvh bg-primary-color">
      <Header />
      <div className="w-full min-h-[80%] ">
        <Wallet userData={userData} />
      </div>
      <Footer />
    </div>
  );
}
