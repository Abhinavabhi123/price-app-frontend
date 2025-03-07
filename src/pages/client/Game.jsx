import { useEffect, useState } from "react";
import Header from "../../container/client/Header";
import { getGamesAndArts } from "../../services/userApiServices";
import Loading from "../../components/Loading/Loading";
import Card from "../../container/client/Card";
import Arts from "../../container/client/Arts";

export default function Game() {
  const [cardData, setCardData] = useState({});
  const [artData, setArtData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getGamesAndArts(setLoading, setCardData, setArtData);
  }, []);

  if (loading) {
    return <Loading type="User" />;
  }

  console.log(artData, "data");

  return (
    <div className="w-screen h-dvh md:h-fit overflow-x-hidden bg-primary-color pb-20">
      <Header />
      {/* card showing section */}
      <Card cardData={cardData} />
      <div className="w-full h-fit px-5 md:px-[15%] " id="arts">
        <div className="w-full h-full bg-red-">
          <div className="flex items-center space-x-2">
            <p className="w-fit text-nowrap">Popular Art</p>
            <div className="w-full h-[1px] bg-gray-400" />
          </div>
          <section className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-4 mt-10">
            {artData.map((art, index) => (
              <Arts key={index} art={art} setArtData={setArtData} />
            ))}
          </section>
        </div>
      </div>
    </div>
  );
}
