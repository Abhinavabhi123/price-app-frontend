import Header from "../../container/client/Header";
import LightRay from "../../assets/light-ray.jpg";
import PrizeBox from "../../assets/prize-box.png";
import { MdKeyboardArrowRight } from "react-icons/md";
import { useNavigate } from "react-router-dom";


export default function LandingPage() {
  const navigate = useNavigate() 


  return (
    <div className="w-screen h-dvh  bg-primary-color">
      <img src={LightRay} alt="ray" className="absolute top-0 right-0 z-0" />
      {/* <Headroom> */}
      <Header />
      {/* </Headroom> */}
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
              <p >Where Art Becomes Treasure </p>
              <p >{`Buy, Sell & Win.`}</p>
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
                onClick={()=>navigate()}
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
      {/* <div className="w-full h-[200vh] bg-primary-color"></div> */}
    </div>
  );
}
