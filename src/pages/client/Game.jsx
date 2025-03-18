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
  const [nextCard, setNextCard] = useState({});

  useEffect(() => {
    getGamesAndArts(setLoading, setCardData, setArtData, setNextCard);
  }, []);

  if (loading) {
    return <Loading type="User" />;
  }

  console.log(cardData, "cardData");

  return (
    <div className="w-screen h-dvh md:h-fit overflow-x-hidden bg-primary-color pb-20">
      <Header />
      {/* card showing section */}
      {nextCard && Object.keys(nextCard).length > 0 ? (
        <Card cardData={nextCard} />
      ) : (
        <div className="w-full px-[15%] my-5">
          <div className="w-full b-fit flex  bg-yellow-500/30 rounded-xl justify-center items-center py-10">
            <p>Next lucky draw is not available !!</p>
          </div>
        </div>
      )}
      <div className="w-full h-fit px-5 md:px-[15%] " id="arts">
        <div className="w-full h-full bg-red-">
          <div className="flex items-center space-x-2">
            <p className="w-fit text-nowrap">Popular Art</p>
            <div className="w-full h-[1px] bg-gray-400" />
          </div>
          <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8 md:gap-4 mt-10">
            {artData &&
              artData.map((art, index) => (
                <Arts
                  key={index}
                  art={art}
                  setArtData={setArtData}
                  cardData={cardData.length > 0 && cardData[index]}
                  nextCard={nextCard && nextCard}
                  index={index}
                />
              ))}
          </section>
        </div>
      </div>
    </div>
  );
}
