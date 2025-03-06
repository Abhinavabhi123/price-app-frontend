import { Modal } from "antd";

export default function ArtPreviewModal(Props) {
  const { isModalOpen, handleCancel, data } = Props;
  return (
    <Modal
      title="Art Preview"
      centered
      open={isModalOpen}
      onCancel={handleCancel}
      footer={null}
      width={800}
    >
      <div className="w-full h-full border-t">
        {/* top section */}
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2  flex justify-center items-center md:border-r border-gray-400">
            <img
              src={`${import.meta.env.VITE_SERVER_URL}/uploads/arts/${
                data.image
              }`}
              alt="image"
              className="scale-90 border border-gray-400 rounded-lg"
            />
          </div>
          <div className="w-full md:w-1/2 p-5 flex flex-col items-center">
            <p className="w-full text-left  mb-4 uppercase text-ellipsis line-clamp-2">
              Name: <span className="font-semibold">{data?.name || ""}</span>
            </p>
            <p className="w-full text-left text-ellipsis line-clamp-5">
              Description :{" "}
              <span className="font-semibold">{data?.description || ""}</span>
            </p>
            <p className="w-full text-left truncate">
              Price : <span className="font-semibold">{data?.price || ""}</span>
              <small>/-</small>
            </p>
            <p className="w-full text-left truncate">
              Purchases :{" "}
              <span className="font-semibold">{data?.purchaseCount || 0}</span>
            </p>
            <p className="w-full text-left">
              Question :{" "}
              <span className="font-semibold">{data?.question || ""}</span>
            </p>
            <p className="w-full text-left truncate">
              Answer :{" "}
              <span className="font-semibold">{data?.answer || ""}</span>
            </p>
            <p className="w-full text-left truncate">
              Owner :{" "}
              <span className="font-semibold">
                {data?.ownerModel === "Admin"
                  ? "Admin"
                  : data?.ownerId?.name
                  ? data?.ownerId?.name
                  : ""}
              </span>
            </p>
          </div>
        </div>
        {/* bottom section */}
        <div className="flex justify-between">
          <div>
            <div className="flex justify-center items-center gap-2">
              <p
                className={`${data.status ? "text-green-500" : "text-red-500"}`}
              >
                {data.status ? "Active" : "In Active"}
              </p>
              <div
                className={`size-3 rounded-full animate-ping ${
                  data.status ? "bg-green-500" : "bg-red-500"
                }`}
              ></div>
            </div>
          </div>
          <div>
            <p className="text-xs">
              created - {new Date(data?.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </Modal>
  );
}
