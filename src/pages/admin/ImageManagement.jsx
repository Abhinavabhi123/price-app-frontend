import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import { IoTrashOutline } from "react-icons/io5";
import {
  deleteCardImage,
  getCardImages,
} from "../../services/adminApiServices";
import CardImageModal from "../../container/admin/CardImageModal";

export default function ImageManagement() {
  const imageRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    setPreview(null);
    getCardImages(setData);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  }, [imageUploaded]);
  useEffect(() => {
    if (isModalOpen === false&&imageRef.current) {
      imageRef.current.value = "";
      setPreview(null)
    }
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function deleteImage(id) {
    deleteCardImage(id, setImageUploaded);
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-[10%]">
        <PageHeader
          title="Image Management"
          btnText="UpLoad Image"
          handleClick={() => showModal(true)}
        />
      </div>
      <CardImageModal
        setPreview={setPreview}
        handleCancel={handleCancel}
        setImageUploaded={setImageUploaded}
        isModalOpen={isModalOpen}
        preview={preview}
        imageRef={imageRef}
      />
      <div className="w-full h-[90%] p-5">
        <div className="overflow-x-auto">
          <table className="table ">
            <thead>
              <tr>
                <th>SI No.</th>
                <th>Name</th>
                <th>Image</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item?.imageName}</td>
                  <td className="">
                    <div className="size-10 outline-1 outline-gray-400">
                      <img
                        className="w-full h-full object-cover"
                        src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
                          item?.image
                        }`}
                        alt="card image"
                      />
                    </div>
                  </td>
                  <td className=" ps-8">
                    <button
                      className="cursor-pointer"
                      onClick={() => deleteImage(item?._id)}
                    >
                      <IoTrashOutline size={20} className="text-red-500" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
