import BlobImage from "../../assets/blob.jpg";
import CardImage from "../../assets/cardImage.png";

export default function Card(Props) {
  const { cardData } = Props;
  return (
    <section className="w-full p-5 md:px-[15%] md:py-10">
      <p className="py-3">Next Lucky draw</p>
      <div className="w-full h-fit md:h-[23rem] rounded-3xl overflow-hidden relative flex flex-col md:flex-row">
        <img
          src={BlobImage}
          alt="banner"
          className="w-full h-full object-cover backdrop-blur-md  absolute top-0 left-0 z-0"
        />
        <div className="w-full h-full md:w-1/2 relative px-10  pt-10 md:pt-10 md:p-10">
          <p
            data-aos="fade-up"
            className="text-xl md:text-4xl w-44 font-semibold tracking-wider md:leading-6 drop-shadow-[4px_4px_5px_rgba(248,248,248,0.8)]"
          >
            Buy Sell
            <span className="text-3xl md:text-5xl font-extrabold "> & Win</span>
          </p>
          <p data-aos="fade-up" className="text-2xl md:mt-5">
            {cardData?.name}
          </p>
          <p className="text-xs mt-1 md:mt-2 font-semibold" data-aos="fade-up">
            Unlock exclusive benefits with your gift card! Use this coupon to
            enjoy special discounts and offers. Simply wait until to find the
            winner. Treat yourself or share the joy with someone special!
          </p>
          <p className="text-sm mt-2">
            Date :- {new Date(cardData?.endDate).toLocaleString()}
          </p>
          <p className="text-sm">Prize :- {cardData?.priceMoney}/- Rs</p>
          <a href="#arts">
            <button
              data-aos="zoom-in-up"
              className="rounded-full px-6 cursor-pointer mt-5 md:mt-1 py-2 font-semibold bg-[#F4C72F] text-[#3B0738] text-sm"
            >
              Get More coupon
            </button>
          </a>
        </div>
        <div className="w-full h-full md:w-1/2 relative flex justify-center items-center">
          <img
            src={CardImage}
            alt="card image"
            data-aos="fade-right"
            className="max-w-72 md:max-w-full w-full h-full object-cover md:scale-75"
          />
        </div>
      </div>
    </section>
  );
}
