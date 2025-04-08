import { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import {
  activateCard,
  deleteCardDetails,
  getCards,
  inActiveCard,
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
  function inactiveCardStatus(id) {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to in active this card!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Inactivate!",
    }).then((result) => {
      if (result.isConfirmed) {
        inActiveCard(id, setChanged);
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

  // Sorting Function
  const sortedData = [...cardData].sort((a, b) => {
    const valueA = a[sortField]?a[sortField]:"";
    const valueB = b[sortField]?b[sortField]:"";

    if (typeof valueA === "string") {
      return sortOrder === "asc"
        ? valueA.localeCompare(valueB)
        : valueB.localeCompare(valueA);
    }
    return sortOrder === "asc" ? valueA - valueB : valueB - valueA;
  });
  

  // Search Filter
  const filteredData = sortedData.filter(
    (card) =>
      card.name.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      // card.cardId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.startDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card.endDate.toLowerCase().includes(searchQuery.toLowerCase()) ||
      card?.priceMoney?.toString().includes(searchQuery) ||
      card?.premium?.toString().includes(searchQuery)
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
            <div className="p-5 flex justify-end">
              <Input
                placeholder="Search by Name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                allowClear
                className="w-full max-w-sm mb-3"
              />
            </div>
            <div className="max-h-[400px] overflow-auto">
              <table className="table table-md">
                <thead className="border-y sticky top-0 bg-admin-primary-color z-10">
                  <tr className="text-center select-none">
                    <th className="border-x">SI No</th>
                    <th
                      className="w-58 border-r  cursor-pointer flex items-center justify-center gap-1"
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
                      className="border-r cursor-pointer relative"
                      onClick={() => {
                        setSortField("cardId");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Card Id
                      <span className="absolute right-0 top-[50%] -translate-y-[50%]">
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
                    <th
                      className="border-r flex cursor-pointer justify-center items-center gap-1"
                      onClick={() => {
                        setSortField("priceMoney");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Price Money
                      <span>
                        {sortField === "priceMoney" ? (
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
                    <th
                      className="border-r cursor-pointer relative"
                      onClick={() => {
                        setSortField("premium");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Premium
                      <span className="absolute right-0 top-[50%] -translate-y-[50%]">
                        {sortField === "premium" ? (
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
                    <th className="border-r">Image</th>
                    <th
                      className="border-r cursor-pointer relative"
                      onClick={() => {
                        setSortField("startDate");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Start Date
                      <span className="absolute right-0 top-[50%] -translate-y-[50%]">
                        {sortField === "startDate" ? (
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
                    <th
                      className="border-r cursor-pointer flex items-center justify-center gap-1"
                      onClick={() => {
                        setSortField("endDate");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      End Date
                      <span>
                        {sortField === "endDate" ? (
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
                      <td className="text-center">{item.id || index + 1}</td>
                      <td className="text-center">{item?.name?.name || ""}</td>
                      <td className="text-center">{"Null"}</td>
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
                        {item?.completed ? "Yes" : "No"}
                      </td>
                      <td className="text-center ">
                        {item?.status ? (
                          item?.completed ? (
                            <div className="px-2 bg-green-500 text-xs py-1 rounded-lg opacity-65 ">
                              Activated
                            </div>
                          ) : (
                            <button
                              className="px-2 bg-green-500 text-xs py-1 rounded-lg cursor-pointer outline-none"
                              onClick={() => inactiveCardStatus(item._id)}
                            >
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
                showTotal={(total, range) => (
                  <span
                    style={{ color: "white" }}
                  >{`${range[0]}-${range[1]} of ${total} items`}</span>
                )}
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
