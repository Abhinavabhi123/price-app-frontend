import { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import {
  activateCard,
  deleteCardDetails,
  getCards,
} from "../../services/adminApiServices";
import { Empty, Pagination, Input } from "antd";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { IoEyeOutline, IoTrashOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import CardPreviewModal from "../../container/admin/CardPreviewModal";
import UpdateCardModal from "../../container/admin/UpdateCardModal";
import { FiChevronUp } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

export default function CardManagement() {
  const [cardData, setCardData] = useState([]);
  const [changed, setChanged] = useState(false);
  const MySwal = withReactContent(Swal);
  const [showModal, setShowModal] = useState(false);
  const [preview, setPreview] = useState(null);
  const [editModal, setEditModal] = useState(false);
  const [editDetails, setEditDetails] = useState({});

  // Sorting State
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getCards(setCardData);
  }, [changed]);

  function deleteCard(id) {
    MySwal.fire({
      title: "Are you sure?",
      text: "This card is protected from deletion.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteCardDetails(id, setChanged);
      }
    });
  }

  function activateCardStatus(id) {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to active this card!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Activate!",
    }).then((result) => {
      if (result.isConfirmed) {
        activateCard(id, setChanged);
      }
    });
  }
  const handleCancel = () => {
    setShowModal(false);
    setPreview(null);
  };

  const closeEditModal = () => {
    setEditModal(false);
  };

  console.log(cardData, "cardData");

  // Sorting Function
  const sortedData = [...cardData].sort((a, b) => {
    const valueA = a[sortField];
    const valueB = b[sortField];

    if (typeof valueA === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  });

  // Search Filter
  const filteredData = sortedData.filter(
    (art) =>
      art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.cardId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="w-full h-full">
      <CardPreviewModal
        handleCancel={handleCancel}
        isModalOpen={showModal}
        data={preview}
      />
      <UpdateCardModal
        isModalOpen={editModal}
        closeEditModal={closeEditModal}
        setChanged={setChanged}
        editDetails={editDetails}
      />
      <div className="w-full h-[10%]">
        <PageHeader
          title="Card Management"
          btnText="Create Card"
          link="/admin/createCard"
          backBtnActive={false}
        />
      </div>
      <div className="w-full h-[90%] p-5">
        {cardData.length > 0 ? (
          <div className="w-full">
            <div className="max-h-[500px] overflow-auto">
              <div className="p-5 flex justify-end">
                <Input
                  placeholder="Search by Name"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  allowClear
                  className="w-full max-w-sm mb-3"
                />
              </div>
              <table className="table table-md">
                <thead className="border-y sticky top-0 bg-admin-primary-color z-10">
                  <tr className="text-center select-none">
                    <th className="border-x">SI No</th>
                    <th
                      className="w-64 border-r  cursor-pointer flex items-center justify-center gap-1"
                      onClick={() => {
                        setSortField("name");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Card Name
                      {sortField === "name" ? (
                        sortOrder === "asc" ? (
                          <FiChevronUp />
                        ) : (
                          <IoIosArrowDown />
                        )
                      ) : (
                        ""
                      )}
                    </th>
                    <th
                      className="border-r cursor-pointer"
                      onClick={() => {
                        setSortField("cardId");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Card Id
                      <span>
                        {sortField === "cardId" ? (
                          sortOrder === "asc" ? (
                            <FiChevronUp />
                          ) : (
                            <IoIosArrowDown />
                          )
                        ) : (
                          ""
                        )}
                      </span>
                    </th>
                    <th className="border-r">Price Money</th>
                    <th className="border-r">Premium</th>
                    <th className="border-r">Image</th>
                    <th className="border-r">Start Date</th>
                    <th className="border-r">End Date</th>
                    <th className="border-r">Completed</th>
                    <th className="border-r w-28">Status</th>
                    <th className="border-r">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={index}
                      className={`${
                        index % 2 == 0 ? "bg-gray-500/50" : "bg-gray-600"
                      }`}
                    >
                      <td className="text-center">{index + 1}</td>
                      <td className="text-center">{item?.name || ""}</td>
                      <td className="text-center">{item?.cardId || ""}</td>
                      <td className="text-center">{item?.priceMoney || ""}</td>
                      <td className="text-center">{item?.premium || ""}</td>
                      <td className="text-center">
                        <img
                          className="size-10"
                          src={`${import.meta.env.VITE_SERVER_URL}/uploads/${
                            item?.image?.image
                          }`}
                          alt=""
                        />
                      </td>
                      <td className="text-center text-xs">
                        {new Date(item?.startDate).toLocaleString() || ""}
                      </td>
                      <td className="text-center text-xs">
                        {new Date(item?.endDate).toLocaleString() || ""}
                      </td>
                      <td
                        className={`text-center text-xs ${
                          item?.completed ? "text-green-500" : ""
                        }`}
                      >
                        {item?.completed ? "Completed" : "Not Completed"}
                      </td>
                      <td className="text-center ">
                        {item?.status ? (
                          item?.completed ? (
                            <div className="px-2 bg-green-500 text-xs py-1 rounded-lg opacity-65 ">
                              Activated
                            </div>
                          ) : (
                            <button className="px-2 bg-green-500 text-xs py-1 rounded-lg cursor-pointer outline-none">
                              Active
                            </button>
                          )
                        ) : (
                          <button
                            className="px-2 bg-red-500 text-xs py-1 rounded-lg cursor-pointer outline-none"
                            onClick={() => activateCardStatus(item._id)}
                          >
                            In Active
                          </button>
                        )}
                      </td>
                      <td className="flex items-center justify-center gap-1 mt-2">
                        <IoEyeOutline
                          size={20}
                          className="cursor-pointer"
                          onClick={() => {
                            setShowModal(true);
                            setPreview(item);
                          }}
                        />
                        {!item?.completed && (
                          <MdOutlineModeEdit
                            size={18}
                            className="cursor-pointer"
                            onClick={() => {
                              setEditModal(true);
                              setEditDetails(item);
                            }}
                          />
                        )}
                        {!item?.completed && (
                          <IoTrashOutline
                            onClick={() => deleteCard(item?._id)}
                            size={20}
                            className="text-red-500 cursor-pointer"
                          />
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-end mt-5">
              <Pagination
                showSizeChanger
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                current={currentPage}
                pageSize={pageSize}
                total={cardData.length}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-[100%] flex justify-center items-center ">
            <Empty
              description={
                <span style={{ color: "white" }}>No Data Available</span>
              }
            />
          </div>
        )}
      </div>
    </section>
  );
}
