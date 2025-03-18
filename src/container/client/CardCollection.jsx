import { MdOutlineFileDownload } from "react-icons/md";

export default function CardCollection(Props) {
  const { collectionData } = Props;

  const handleDownload = async (imagePath, imageName) => {
    try {
      const response = await fetch(imagePath);
      const blob = await response.blob();
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = imageName || "downloaded-art.jpg";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading image:", error);
    }
  };

  return (
    <div className="w-full min-h-[22rem]  md:px-28 py-5 px-10">
      <p className="text-xl">Owned art collections :-</p>

      <div className="w-full h-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4 mt-5 ">
        {collectionData &&
          collectionData.length > 0 &&
          collectionData.map((art, index) => (
            <div
              key={index}
              className="w-full aspect-square bg-white rounded-xl overflow-hidden shadow-md shadow-gray-600 relative group"
            >
              <div className="w-full h-full rounded-xl">
                <img
                  src={`${import.meta.env.VITE_SERVER_URL}/uploads/arts/${
                    art?.artId?.image
                  }`}
                  alt="art image"
                  className="w-full h-full object-cover  cursor-pointer "
                />
              </div>
              <div className="absolute w-full h-full top-0 left-0 bg-black/70 transition-transform translate-y-full  duration-500 ease-in-out group-hover:translate-y-0 group-active:translate-y-0 p-5">
                <p className="text-lg w-full font-semibold truncate">
                  {art?.artId.name}
                </p>
                <p className="text-sm mt-5">Count :- {art?.count}</p>
                <p className="text-sm">Price :- {art?.artId?.price}/-</p>
                <div
                  className="w-full h-10 bg-blue-500 mt-5 rounded-xl flex justify-center items-center gap-1 cursor-pointer select-none hover:bg-blue-600 transition-colors duration-300"
                  onClick={() =>
                    handleDownload(
                      `${import.meta.env.VITE_SERVER_URL}/uploads/arts/${
                        art?.artId?.image
                      }`,
                      `${art?.artId.name}.jpg`
                    )
                  }
                >
                  <p>Download</p>
                  <MdOutlineFileDownload size={22} />
                </div>
                <p className="text-[9px] mt-5">
                  Latest purchase date : {new Date(art.purchaseDate).toLocaleString()}
                </p>
              </div>
              <div className="absolute top-0 right-0 size-8 rounded-full bg-red-500 shadow-2xl flex justify-center items-center group-hover:opacity-0 transition-opacity duration-300">
                <p className="text-sm">{art?.count}</p>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
