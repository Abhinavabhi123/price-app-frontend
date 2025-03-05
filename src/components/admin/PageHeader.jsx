import { useNavigate } from "react-router-dom";
import { IoChevronBackOutline } from "react-icons/io5";

export default function PageHeader(Props) {
  const {
    title = "",
    btnText = "New",
    link,
    btnActive = true,
    backBtnActive = true,
    handleClick = () => {},
  } = Props;
  const navigate = useNavigate();

  return (
    <div className="w-full h-14 px-10 bg-admin-primary-color">
      <div className="w-full h-full flex items-center justify-between border-b-2 border-admin-active-color">
        <div className="flex items-center gap-3">
          {backBtnActive && (
            <IoChevronBackOutline
              size={20}
              className="text-white cursor-pointer"
              onClick={() => navigate(-1)}
            />
          )}
          <p className="text-xl text-white">{title}</p>
        </div>
        {btnActive && (
          <button
            type="button"
            onClick={() => (link ? navigate(link) : handleClick())}
            className="rounded-md outline-none text-white bg-admin-active-color px-3 py-1 cursor-pointer text-sm"
          >
            {btnText}
          </button>
        )}
      </div>
    </div>
  );
}
