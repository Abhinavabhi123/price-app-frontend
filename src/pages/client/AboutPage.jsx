import Footer from "../../container/client/Footer";
import Header from "../../container/client/Header";

export default function AboutPage() {
  return (
    <div className="w-screen bg-primary-color text-white">
      <Header />
      <div className="w-full min-h-[25rem] bg-transparent px-10 md:px-28 py-10">
        <div className="space-y-5">
          <p className="text-xl md:text-3xl font-semibold">
            Welcome to Prize Auction App!
          </p>
          <p className="indent-8 text-sm md:text-base">
            At Prize Auction App, we bring an exciting and fair auction-based
            reward system where users can bid on exclusive coupons and prizes.
            Whether you’re looking for discounts, special deals, or exclusive
            items, our platform allows you to win amazing prizes through a
            transparent and competitive bidding process.
          </p>
        </div>
        <div className="mt-4 space-y-5">
          <p className="text-lg md:text-2xl font-semibold">How It Works</p>
          <ul className="ps-5 text-sm md:text-base">
            <li>
              🔹 Bid on Coupons & Prizes – Users can place bids on available
              coupons and prizes in a live auction.{" "}
            </li>
            <li>
              🔹 Smart Auction System – The highest bid wins within the auction
              timeframe, ensuring a fair competition.
            </li>
            <li>
              🔹 Elimination Rounds – Some auctions feature elimination rounds,
              making the process even more thrilling.
            </li>
            <li>
              🔹Secure Transactions – Wallet balances are securely managed,
              ensuring fair payments and winnings.
            </li>
            <li>
              🔹 Instant Prize Transfers – Once an auction ends, the coupon is
              automatically transferred to the winning bidder.
            </li>
          </ul>
        </div>
        <div className="mt-5 space-y-5">
          <p className="text-lg md:text-2xl font-semibold">Why Choose Us?</p>
          <ul className="space-y-3 ps-5 text-sm  md:text-base">
            <li>
              Real-Time Bidding: Engage in live auctions with a seamless
              experience.
            </li>
            <li>
              Fair & Transparent: Every bid and transaction is recorded
              securely.
            </li>
            <li>
              Exciting Rewards: Win exclusive discounts, vouchers, and premium
              coupons.
            </li>
            <li>
              User-Friendly: Simple, intuitive, and engaging interface for all
              users.
            </li>
            <li>
              Secure Wallet System: Funds are managed securely, with instant
              updates.
            </li>
          </ul>
        </div>
        <div className="mt-5 space-y-5">
          <p className="text-lg md:text-2xl font-semibold">Our Vision</p>
          <p className="ps-5 text-sm md:text-base">
            Our mission is to redefine online auctions by making them more
            engaging, fair, and rewarding for all users. We aim to create a
            community where users enjoy the thrill of bidding while winning
            real, valuable rewards.
          </p>
        </div>
        <div className="mt-5 space-y-5">
          <p className="text-lg md:text-2xl font-semibold">Join the Auction Today!</p>
          <p className="text-sm md:text-base">Ready to win exciting prizes and be part of the action? Sign up now and start bidding on your favorite coupons!</p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
