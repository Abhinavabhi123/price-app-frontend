import { Modal } from "antd";

export default function CardPreviewModal(Props) {
  const { isModalOpen, handleCancel, data } = Props;
  return (
    <div className="flex justify-center items-center">
      <Modal
        title="Card Preview"
        centered
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
        width={500}
      >
        <div className="w-full h-full border-t">
          <p className="font-semibold">Name :- {data?.name?.name}</p>
          <p className="font-semibold">
            Start Date:-{" "}
            {data?.startDate ? new Date(data?.startDate).toLocaleString() : ""}
          </p>
          <p className="font-semibold">
            End Date:-{" "}
            {data?.endDate ? new Date(data?.endDate).toLocaleString() : ""}
          </p>
          <p className="font-semibold">
            Price Money :- {data?.priceMoney}/- Rs
          </p>
          <p className="font-semibold">Premium :- {data?.premium}/- Rs</p>
          <p className="font-semibold">
            Completed :-
            <span className={`${data?.completed && "text-green-500"}`}>
              {" "}
              {data?.completed ? "Yes" : "No"}
            </span>
          </p>
          <p className="font-semibold">Total Coupons :- {data?.couponCount}</p>
          <p className="font-semibold">Elimination Stages :</p>
          {data &&
            data?.eliminationStages.length > 0 &&
            data?.eliminationStages.map((stage, index) => (
              <p key={index} className="ps-5">
                {new Date(stage?.stageDate).toLocaleString()} -&gt;{" "}
                <span className={`${stage?.status && "text-green-500"}`}>
                  {!stage?.status ? "Not completed" : "Completed"}
                </span>
              </p>
            ))}
          {data && data?.winnerCoupon ? (
            <div>
              <p className="font-semibold text-[#ffcc00]">Winner :- </p>
              <div className="ps-10">
                {data?.winnerCoupon?.userId?.name && (
                  <p className="text-black">
                    Name : {data?.winnerCoupon?.userId?.name}
                  </p>
                )}
                {data?.winnerCoupon?.userId?.email && (
                  <p className="text-black">
                    Email : {data?.winnerCoupon?.userId?.email || ""}
                  </p>
                )}
                {data?.winnerCoupon?.userId?.mobile && (
                  <p className="text-black">
                    Mobile : {data?.winnerCoupon?.userId?.mobile || ""}
                  </p>
                )}
              </div>
            </div>
          ) : data && data.completed ? (
            <p className="text-yellow-500">
              No winner selected, because no coupon was sold.
            </p>
          ) : null}

          <img
            className="size-28 border rounded-lg mt-3"
            src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
              data?.image?.image
            }`}
            alt="card image"
          />
          <div className="flex items-center justify-between mt-5 border-t">
            <div className="flex items-center justify-center gap-3   ">
              <p
                className={`text-sm ${
                  data && data.status ? "text-green-500" : "text-red-500"
                }`}
              >
                Status
              </p>
              <div
                className={`size-2 rounded-full ${
                  data && data.status ? "bg-green-500" : "bg-red-500"
                } animate-ping `}
              ></div>
            </div>
            <div>
              <p className="text-xs font-semibold">
                Crated At {new Date(data?.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
