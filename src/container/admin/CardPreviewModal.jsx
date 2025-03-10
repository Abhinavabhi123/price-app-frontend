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
          <p className="font-semibold">Name :- {data?.name}</p>
          <p className="font-semibold">Card Id :- {data?.cardId}</p>
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
            Completed :- {data?.completed ? "Yes" : "No"}
          </p>
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
                Crated At {data?.createdAt}
              </p>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
