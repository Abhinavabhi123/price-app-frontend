import { useEffect, useRef, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import { IoTrashOutline } from "react-icons/io5";
import {
  deleteCardImage,
  getCardImages,
} from "../../services/adminApiServices";
import { Empty } from "antd";
import CardImageModal from "../../container/admin/CardImageModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function ImageManagement() {
  const imageRef = useRef(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [imageUploaded, setImageUploaded] = useState(false);
  const [data, setData] = useState([]);
  const MySwal = withReactContent(Swal);

  useEffect(() => {
    setPreview(null);
    getCardImages(setData);
    if (imageRef.current) {
      imageRef.current.value = "";
    }
  }, [imageUploaded]);
  useEffect(() => {
    if (isModalOpen === false && imageRef.current) {
      imageRef.current.value = "";
      setPreview(null);
    }
  }, [isModalOpen]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  function deleteImage(id) {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to delete image !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCardImage(id, setImageUploaded);
      }
    });
  }

  return (
    <div className="w-full h-full">
      <div className="w-full h-[10%]">
        <PageHeader
          title="Image Management"
          btnText="UpLoad Image"
          handleClick={() => showModal(true)}
          backBtnActive={false}
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
        {
          data.length>0?(

          
        <div className="max-h-[500px] overflow-auto">
          <table className="table table-md">
            <thead className="border-y sticky top-0 bg-admin-primary-color z-10">
              <tr>
                <th className="border-x">SI No.</th>
                <th className="border-r">Name</th>
                <th className="border-r">Image</th>
                <th className="border-r">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 == 0 ? "bg-gray-500/50" : "bg-gray-600"
                  }`}
                >
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
        ):(
          <div className="w-full h-[100%] flex justify-center items-center ">
          <Empty
            description={
              <span style={{ color: "white" }}>No Data Available</span>
            }
          />
        </div>
        )
      }
      </div>
    </div>
  );
}
