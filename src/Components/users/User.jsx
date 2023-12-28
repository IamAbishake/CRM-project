import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import ReactPaginate from "react-paginate";
import BarLoader from "react-spinners/BarLoader";
import { GoSearch } from "react-icons/go";



const User = () => {
  const [users, setUsers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading]= useState(true);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");


  const usersPerPage = 5; 
  const pagesVisited = currentPage * usersPerPage;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://crm-backend-wyng.onrender.com/api/getall");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    // Filter the orders based on the search term
    const filtered = users.filter((user) =>
      user.fname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);


  const openModal = (userId) => {
    setSelectedUserId(userId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedUserId(null);
    setIsModalOpen(false);
  };

  
  const handleSearch = () => {
    // Filter the orders based on the search term
    const filtered = users.filter((user) =>
      user.fname.toUpperCase().includes(searchTerm.toUpperCase())
    );
  
    // Update the filtered orders and reset the current page to 0
    setFilteredUsers(filtered);
    setCurrentPage(0);
  };

  const deleteUser = async (userId) => {
    try {
      const response = await axios.delete(
        `https://crm-backend-wyng.onrender.com/api/delete/${userId}`
      );
      setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
      toast.success(response.data.msg, { position: "top-right" });
    } catch (error) {
      console.error("error deleting user:", error);
    } finally {
      closeModal();
    }
  };

  const pageCount = Math.ceil(users.length / usersPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div className="w-3/4 h-3/4 mb-10 mt-28 border-none ml-72 rounded-lg">
      {loading ? (
          <div className="grid place-items-center mt-52">
            <BarLoader
              color="#36d7b7"
              width={200}
              height={6}
              loading={loading}
              speedMultiplier={2}
            />
          </div>
        ) : (
         
        <div>
         
          <div>
          <div className=" grid place-items-center grid-cols-3 mt-4 ml-4">
                
                  <Link
                    className="text-white bg-sky-500 hover:bg-sky-700 shadow-lg shadow-black ml-28 focus:outline-none
                      focus:ring-sky-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    to={"/Customer/Adduser"}
                  >
                    ADD USER +
                  </Link>
                <input
                  type="text"
                  placeholder="Search by User Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-400 p-2 w-80 rounded-md"
                />
                <button
                  className="bg-sky-500 mr-96 hover:bg-blue-600 border border-gray-400 text-white font-bold py-2 px-2 rounded"
                  onClick={handleSearch}
                >
                <GoSearch className="w-6 h-6" />
                </button>
              </div>
            {filteredUsers.length > 0 ? (
              <div className="flex-row ml-28 justify-center w-3/4 ">
                <table
                  className="w-5/6 text-base mt-10 ml-10 rounded-3xl mr-2 mb-10 min-w-full text-left shadow-2xl shadow-black
                  text-gray-500 dark:text-gray-400"
                >
                  <thead className="text-white uppercase whitespace-nowrap bg-sky-500 border-b ">
                    <tr className="text-base">
                      <th className="px-6 py-3">S.NO</th>
                      <th className="px-6 py-3">User Name</th>
                      <th className="px-6 py-3">Email</th>
                      <th className="px-6 py-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="text-black">
                    {filteredUsers
                    .slice(pagesVisited, pagesVisited + usersPerPage)
                    .map((user, index) => (
                      <tr
                        className="border-b-2 odd:bg-white even:bg-gray-200 whitespace-nowrap dark:border-gray-800"
                        key={user._id}
                      >
                        <td className="whitespace-nowrap px-6 py-4">
                          {index + 1}.
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.fname} {user.lname}
                        </td>
                        <td className="whitespace-nowrap px-6 py-4">
                          {user.email}
                        </td>
                        <td className="flex ml-2 justify-around">
                          <Link
                            className=""
                            to={`/Customer/edit/` + user._id}
                          >
                            <FaRegEdit className="text-green-800 mt-2 mr-8 h-8 w-6" />
                          </Link>
                          <button onClick={() => openModal(user._id)}>
                            <MdDelete className="text-red-600 mt-2 mr-8 h-8 w-8" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <ReactPaginate
                    previousLabel={"Previous"}
                    nextLabel={"Next"}
                    pageCount={pageCount}
                    onPageChange={changePage}
                    containerClassName={"pagination mt-5 ml-72 flex space-x-2"}
                    previousLinkClassName={"px-3 py-2 bg-gray-300 text-gray-700 rounded-md"}
                    nextLinkClassName={"px-3 py-2 bg-gray-300 text-gray-700 rounded-md"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"bg-sky-500 text-white px-3 rounded-md"}
                  />   
              </div>
            ) : (
              <div className="w-3/4 mt-20 ml-32 font-bold flex justify-center rounded place-items-center text-white text-3xl h-20 bg-sky-950 ">
                <p>No Users</p>
              </div>
            )}
          </div>

          <Outlet />
        </div>
        )}
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-10 rounded shadow-md">
            <p>Are you sure you want to delete this item?</p>
            <br />
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={() => deleteUser(selectedUserId)}
              >
                Yes
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                onClick={closeModal}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default User;








