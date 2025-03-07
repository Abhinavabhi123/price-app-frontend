import "./loading.css";

export default function Loading(Props) {
  const {type="User"} = Props;
  return (
    <div className={`w-screen h-screen flex justify-center items-center ${type==="User"?"bg-primary-color":"bg-admin-primary-color"} `}>
      <span className="loader"></span>
    </div>
  );
}
