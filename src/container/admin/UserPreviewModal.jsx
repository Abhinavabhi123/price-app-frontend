import { Modal } from "antd";
import UserImage from "../../assets/userImage.png";

export default function UserPreviewModal(Props) {
  const { isModalOpen, handleCancel, data } = Props;

  const isGoogleImage = data.picture?.startsWith("https");
  const hasCustomImage = data.picture && !isGoogleImage;

  const imageUrl = isGoogleImage
    ? data.picture
    : hasCustomImage
    ? `${import.meta.env.VITE_SERVER_URL}/uploads/userImage/${data.picture}`
    : UserImage;

  return (
    <div className="flex justify-center items-center">
      <Modal
        title="User Preview"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <div className="w-full h-full ">
          <div className="w-full h-1/2 flex flex-col md:flex-row">
            <div className="w-full h-full flex   justify-center items-center  mt-5">
              <img
                src={imageUrl}
                alt="User"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = UserImage;
                }}
                className="size-20 rounded-full object-cover"
              />
            </div>
            <div className="w-full h-full">
              <p>Name : {data.name}</p>
              <p>Email : {data?.email ? data?.email : "Null"}</p>
              <p>Mobile : {data?.mobile ? data?.mobile : "Null"}</p>
              <p>Age : {data?.age ? data?.age : "Null"}</p>
              <p>Gender : {data?.gender ? data?.gender : "Null"}</p>
            </div>
          </div>
          <div className="w-full h-1/2 mt-2">
            <p>Location : {data?.location ? data?.location : "Null"}</p>
            <p>Wallet : {data?.wallet} Rs</p>
            <p>Total Amount : {data?.total_amount} Rs</p>
            <p>Withdraw Amount : {data?.withDrawAmount} Rs</p>
            <p>Coupon Count : {data?.coupons && data?.coupons.length}</p>
            <p>
              Art Count : {data?.purchasedArts && data?.purchasedArts.length}
            </p>
            <p className="text-xs text-right">
              Created At :{new Date(data?.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </Modal>
    </div>
  );
}
