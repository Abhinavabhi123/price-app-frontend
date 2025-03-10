import { useEffect, useState } from "react";
import PageHeader from "../../components/admin/PageHeader";
import { getUsers } from "../../services/adminApiServices";
import { Empty, Pagination, Input } from "antd";
import { FiChevronUp } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import UserImage from "../../assets/userImage.png";

export default function UserManagement() {
  const [userData, setUserData] = useState([]);

  // Sorting State
  const [sortField, setSortField] = useState("name");
  const [sortOrder, setSortOrder] = useState("asc");

  // Search State
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  useEffect(() => {
    getUsers(setUserData);
  }, []);

  console.log(userData, "userData");
  // Sorting Function
  const sortedData = [...userData].sort((a, b) => {
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
      art.email.toLowerCase().includes(searchQuery.toLowerCase())
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
          title="User Management"
          btnText="Create Art"
          backBtnActive={false}
        />
      </div>
      <div className="w-full h-[90%]  p-5">
        {userData && userData.length > 0 ? (
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
                <tr className="text-center">
                  <th className="border-x">SI No.</th>
                  <th
                    className="border-r w-48 cursor-pointer flex items-center justify-center gap-1"
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
                  <th
                    className="border-r cursor-pointer"
                    onClick={() => {
                      setSortField("email");
                      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
                    }}
                  >
                    email{" "}
                    {sortField === "email" ? (
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
                  <th className="border-r">Coupon count</th>
                  <th className="border-r">Art Count</th>
                  <th className="border-r">Mobile</th>
                  <th className="border-r">Status</th>
                </tr>
              </thead>
              <tbody>
                {paginatedData.map((user, index) => (
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
                      <p className="max-w-48 truncate">{user?.name || ""}</p>
                    </td>
                    <td className="text-center">
                      <p className="max-w-48 truncate">{user.email || ""}</p>
                    </td>
                    <td className="text-center">
                      <img
                        src={`${
                          import.meta.env.VITE_SERVER_URL
                        }/uploads/userImage/${user.picture}`}
                        alt="user image"
                        onError={(e) =>
                          (e.target.src = user?.picture
                            ? user?.picture
                            : UserImage)
                        }
                        className="size-10 rounded-full object-contain"
                      />
                    </td>
                    <td className="text-center">{user.coupons.length}</td>
                    <td className="text-center ">
                      {user.purchasedArts.length}
                    </td>
                    <td className="text-center ">
                      {user.mobile ? user.mobile : "Null"}
                    </td>
                    <td className="text-center">
                      <button
                        className={`text-xs rounded-lg px-3 py-1 outline-none text-white cursor-pointer ${
                          user.access ? "bg-green-500" : "bg-red-500"
                        }`}
                        // onClick={() => changeArtStatus(art?._id, setChange)}
                      >
                        {user.access ? "Active" : "Inactive"}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
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
            total={userData.length}
          />
        </div>
      </div>
    </section>
  );
}
