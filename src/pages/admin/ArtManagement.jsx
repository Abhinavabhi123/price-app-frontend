import { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import ArtModal from "../../container/admin/ArtModal";
import {
  changeArtStatus,
  deleteArtDetails,
  getArts,
} from "../../services/adminApiServices";
import { Empty, Pagination, Input } from "antd";
import { IoTrashOutline, IoEyeOutline } from "react-icons/io5";
import { MdOutlineModeEdit } from "react-icons/md";
import ArtPreviewModal from "../../container/admin/ArtPreviewModal";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { FiChevronUp } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";

export default function ArtManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [change, setChange] = useState(false);
  const [artData, setArtData] = useState([]);
  const [preview, setPreview] = useState(false);
  const [previewData, setPreviewData] = useState({});
  const [editArt, setEditArt] = useState(false);
  const [editData, setEditData] = useState({});
  const MySwal = withReactContent(Swal);

  // Sorting State
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getArts(setArtData);
  }, [change]);

  const showModal = () => setIsModalOpen(true);
  const handleCancel = () => {
    setIsModalOpen(false);
    setPreview(false);
  };

  function editHandler(data) {
    setEditArt(true);
    setEditData(data);
  }

  function closeEditArt() {
    setEditArt(false);
    setEditData({});
  }

  function deleteArt(id) {
    MySwal.fire({
      title: "Are you sure?",
      text: "You want to delete this Art!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteArtDetails(id, setChange);
      }
    });
  }

  // Sorting Function
  const sortedData = [...artData].sort((a, b) => {
    const valueA = a[sortField]? a[sortField]:"";
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
    (art) =>
      art.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      art.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination Logic
  const paginatedData = filteredData.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <section className="w-full h-full">
      <div className="w-full h-[10%]">
        <PageHeader
          title="Art Management"
          btnText="Create Art"
          handleClick={showModal}
          backBtnActive={false}
        />
      </div>

      {/* Modals */}
      <ArtModal
        setChange={setChange}
        handleCancel={handleCancel}
        isModalOpen={isModalOpen}
        title="Create Art"
      />
      <ArtModal
        setChange={setChange}
        handleCancel={closeEditArt}
        isModalOpen={editArt}
        title="Edit Art"
        data={editData}
      />
      <ArtPreviewModal
        isModalOpen={preview}
        handleCancel={handleCancel}
        data={previewData}
      />

      <div className="w-full h-[90%] p-5">
        {artData.length > 0 ? (
          <div className="w-full h-full">
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
                  <tr className="text-center">
                    <th className="border-x">SI No.</th>
                    <th
                      className="border-r cursor-pointer flex items-center justify-center gap-1"
                      onClick={() => {
                        setSortField("name");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Name{" "}
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
                    <th className="border-r min-w-56">Description</th>
                    <th
                      className="border-r cursor-pointer flex items-center justify-center gap-1"
                      onClick={() => {
                        setSortField("price");
                        setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                      }}
                    >
                      Price{" "}
                      {sortField === "price" ? (
                        sortOrder === "asc" ? (
                          <FiChevronUp />
                        ) : (
                          <IoIosArrowDown />
                        )
                      ) : (
                        ""
                      )}
                    </th>
                    <th className="border-r">Image</th>
                    <th className="border-r">Status</th>
                    <th className="border-r">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((art, index) => (
                    <tr
                      key={index}
                      className={
                        index % 2 === 0 ? "bg-gray-500/50" : "bg-gray-600"
                      }
                    >
                      <td className="text-center">
                        {(currentPage - 1) * pageSize + index + 1}
                      </td>
                      <td className="text-center">
                        <p className="max-w-48 truncate">{art?.name || ""}</p>
                      </td>
                      <td className="text-center">
                        <p className="max-w-48 truncate">
                          {art.description || ""}
                        </p>
                      </td>
                      <td className="text-center">{art?.price || ""}</td>
                      <td className="text-center flex justify-center items-center">
                        <img
                          src={`${
                            import.meta.env.VITE_SERVER_URL
                          }/uploads/arts/${art?.image}`}
                          className="size-10 border border-admin-active-color"
                          alt="art Image"
                        />
                      </td>
                      <td className="text-center">
                        <button
                          className={`text-xs rounded-lg px-3 py-1 outline-none text-white cursor-pointer ${
                            art.status ? "bg-green-500" : "bg-red-500"
                          }`}
                          onClick={() => changeArtStatus(art?._id, setChange)}
                        >
                          {art.status ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="text-center">
                        <div className="flex justify-center items-center gap-3">
                          <IoEyeOutline
                            size={20}
                            className="text-white cursor-pointer"
                            onClick={() => {
                              setPreview(true);
                              setPreviewData(art);
                            }}
                          />
                          <MdOutlineModeEdit
                            size={20}
                            className="text-white cursor-pointer"
                            onClick={() =>
                              art.ownerModel === "Admin" ? editHandler(art) : ""
                            }
                          />
                          <IoTrashOutline
                            size={20}
                            className="text-red-500 cursor-pointer"
                            onClick={() => deleteArt(art?._id)}
                          />
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Pagination */}
            <div className="flex justify-end mt-5">
              <Pagination
                showSizeChanger
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                current={currentPage}
                pageSize={pageSize}
                total={artData.length}
              />
            </div>
          </div>
        ) : (
          <div className="w-full h-[100%] flex justify-center items-center">
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
