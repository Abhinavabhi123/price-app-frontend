import { MdEmail } from "react-icons/md";
import { BsPersonLock } from "react-icons/bs";

export default function DetailsHeader() {
  return (
    <header className="w-full h-10 bg-primary-color flex justify-between items-center px-20">
      {/*left section */}
      <div>
        <div className="flex items-center gap-2">
          <MdEmail className="text-white" size={20} />
          <p className="text-white text-sm">example@gmail.com</p>
        </div>
      </div>
      {/* right section */}
      <div>
        <div className="flex justify-center items-center gap-2">
          <BsPersonLock size={22} className="text-red-400" />
          <p className="text-white text-sm cursor-pointer">Login</p>
        </div>
      </div>
    </header>
  );
}
