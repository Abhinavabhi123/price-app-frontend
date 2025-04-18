import Header from "../../container/client/Header";
import LightRay from "../../assets/light-ray.jpg";
import PrizeBox from "../../assets/prize-box.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import Footer from "../../container/client/Footer";
import { FaGavel, FaShieldAlt, FaRegLightbulb } from "react-icons/fa";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="w-screen bg-primary-color">
      <img src={LightRay} alt="ray" className="absolute top-0 right-0 z-0" />
      <Header />
      <section className="flex h-fit justify-center px-10 lg:px-44 py-10 relative z-10">
        <div className="w-full  h-fit flex flex-col md:flex-row text-white">
          {/*left section */}
          <div className="w-full md:w-1/2 h-full bg-transparent md:pe-10">
            <div className="p-[1px] w-fit rounded-full bg-[conic-gradient(from_90deg_at_40%_-25%,#ffd700,#f79d03,#ee6907,#e6390a,#de0d0d,#d61039,#cf1261,#c71585,#cf1261,#d61039,#de0d0d,#ee6907,#f79d03,#ffd700,#ffd700,#ffd700)]">
              <div className="px-3  py-1 w-full h-full rounded-full  bg-primary-color cursor-pointer">
                <p className="text-sm"> Introducing Prizing</p>
              </div>
            </div>
            <div
              data-aos="fade-right"
              className="text-3xl md:text-5xl py-10 md:space-y-5 drop-shadow-[4px_4px_20px_rgba(248,248,248,0.4)]"
            >
              <p>Where Art Becomes Treasure </p>
              <p>{`Buy, Sell & Win.`}</p>
            </div>
            <div>
              <p
                className="text-base text-gray-500"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                {`Discover an intuitive and dynamic bidding platform where you can
                compete, win, and secure the best deals. Whether you're buying
                or selling, our seamless auction experience ensures fair play,
                real-time updates, and a secure marketplace. Start bidding today
                and turn opportunities into victories!`}
              </p>
            </div>
            <div className="py-10">
              <button
                data-aos="fade-up"
                className="rounded-full px-10  py-3 bg-white text-black font-semibold flex justify-center items-center gap-1 cursor-pointer group"
                onClick={() => navigate("/")}
              >
                <p className="group-hover:scale-110 transition-all duration-400">
                  Explore
                </p>
                <MdKeyboardArrowRight
                  size={20}
                  className="text-gray-500 group-hover:scale-110"
                />
              </button>
            </div>
          </div>
          {/* right section */}
          <div className="w-full md:w-1/2 bg-red-5 h-full">
            <img
              src={PrizeBox}
              alt="prize box image"
              data-aos="fade-down-left"
            />
          </div>
        </div>
      </section>
      {/* How It Works Section */}
      <section
        className="py-16 px-10 lg:px-44 text-white text-center"
        data-aos="fade-up"
      >
        <h2 className="text-3xl font-bold mb-6">How It Works</h2>
        <div className="grid md:grid-cols-3 gap-10">
          <div
            className="p-5 bg-gray-800 rounded-xl"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <FaRegLightbulb size={40} className="mx-auto text-yellow-400" />
            <h3 className="text-xl font-semibold mt-4">Discover & List</h3>
            <p className="text-gray-400 mt-2">
              List your items for auction or explore available treasures.
            </p>
          </div>
          <div
            className="p-5 bg-gray-800 rounded-xl"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <FaGavel size={40} className="mx-auto text-red-400" />
            <h3 className="text-xl font-semibold mt-4">Place Your Bids</h3>
            <p className="text-gray-400 mt-2">
              Engage in live bidding wars and secure your winnings.
            </p>
          </div>
          <div
            className="p-5 bg-gray-800 rounded-xl"
            data-aos="fade-up"
            data-aos-delay="300"
          >
            <FaShieldAlt size={40} className="mx-auto text-green-400" />
            <h3 className="text-xl font-semibold mt-4">Win & Receive</h3>
            <p className="text-gray-400 mt-2">
              Complete secure transactions and get your items delivered.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
