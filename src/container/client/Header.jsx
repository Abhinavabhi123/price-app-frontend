import Logo from "../../assets/logo.svg";

export default function Header() {
  return (
    <header className="w-screen h-20  flex items-center px-10 justify-between shadow-md">
      {/* Logo section */}
      <div>
        <img src={Logo} alt="logo" />
      </div>
      {/* nav section */}
      <div>
          <ul className="flex gap-2 text-primary-color">
            <li className="cursor-pointer hover:text-green-400 py-2 px-3 hover:bg-gray-100 rounded-md">Home</li>
            <li className="cursor-pointer hover:text-green-400 py-2 px-3 hover:bg-gray-100 rounded-md">About</li>
            <li className="cursor-pointer hover:text-green-400 py-2 px-3 hover:bg-gray-100 rounded-md">Results</li>
            <li className="cursor-pointer hover:text-green-400 py-2 px-3 hover:bg-gray-100 rounded-md">Contacts</li>
          </ul>
         </div>
         <div>
          <button className="py-2 px-5 text-white bg-green-700 cursor-pointer">Join Now</button>
         </div>
    </header>
  );
}
