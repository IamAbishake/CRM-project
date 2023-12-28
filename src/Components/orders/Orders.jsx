import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import ReactPaginate from "react-paginate";
import BarLoader from "react-spinners/BarLoader";
import { GoSearch } from "react-icons/go";



const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const ordersPerPage = 5; 
  const pagesVisited = currentPage * ordersPerPage;


  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.get("https://crm-backend-wyng.onrender.com/api/getallorder");
      setOrders(response.data);
      } catch (error){
        console.error("error fetching data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    // Filter the orders based on the search term
    const filtered = orders.filter((order) =>
      order.customer.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredOrders(filtered);
  }, [searchTerm, orders]);


  const openModal = (orderId) => {
    setSelectedOrderId(orderId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedOrderId(null);
    setIsModalOpen(false);
  };

  const handleSearch = () => {
    // Filter the orders based on the search term
    const filtered = orders.filter((order) =>
      order.customer.toUpperCase().includes(searchTerm.toUpperCase())
    );
  
    // Update the filtered orders and reset the current page to 0
    setFilteredOrders(filtered);
    setCurrentPage(0);
  };

  const deleteOrder = async () => {
    if (selectedOrderId) {
      try {
        const response = await axios.delete(
          `https://crm-backend-wyng.onrender.com/api/deleteorder/${selectedOrderId}`
        );
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order._id !== selectedOrderId)
        );
        toast.success(response.data.msg, { position: "top-right" });
      } catch (error) {
        console.log(error);
      } finally {
        closeModal();
      }
    }
  };
  
  const pageCount = Math.ceil(orders.length / ordersPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <div>
      <div
        className=" w-3/4 h-3/4 mb-10 mt-28 ml-72 mr-16 border-none rounded-sm"
      >    {loading ? (
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
            <div className=" grid grid-cols-3 place-items-center mt-4 ml-4">
            <Link
                className="text-white bg-sky-500 hover:bg-sky-700 shadow-md shadow-black ml-28 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                to={"/Orders/Addorder"}
              >
                ADD order +
              </Link>
                <input
                  type="text"
                  placeholder="Search by Customer Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border border-gray-400 w-80 p-2 rounded-md"
                />
                <button
                  className="bg-sky-500 mr-96 hover:bg-blue-600 border border-gray-400 text-white font-bold py-2 px-2 rounded"
                  onClick={handleSearch}
                >
               <GoSearch className="w-6 h-6" />
                </button>
              </div>
              {filteredOrders.length > 0 ? (
                <div className="flex-row ml-28  justify-center w-3/4 ">
                  <table className="w-5/6 text-base mt-10 ml-10 mr-2 mb-10 min-w-full text-left shadow-2xl shadow-black text-gray-500 dark:text-gray-400">
                    <thead className="text-white uppercase whitespace-nowrap bg-sky-500 border-b ">
                      <tr className="text-base">
                        <th className="px-6 py-3 ">S.NO</th>
                        <th className="px-6 py-3 ">Cus Name</th>
                        <th className="px-6 py-3 ">Order ID</th>
                        <th className="px-6 py-3 ">Quantity</th>
                        <th className="px-6 py-3 ">Amount</th>
                        <th className="px-6 py-3 ">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-black">
                    {filteredOrders
                        .slice(pagesVisited, pagesVisited + ordersPerPage)
                        .map((order, index) => {
                        return (
                          <tr
                            className="border-b-2   odd:bg-white even:bg-gray-200 whitespace-nowrap dark:border-gray-800"
                            key={order._id}
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              {index + 1}.
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.customer}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.orderno}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.quantity}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {order.amount}
                            </td>
                            <td className="flex ml-5 justify-around">
                              <Link
                                className=""
                                to={`/Orders/updateorder/` + order._id}
                              >
                                <FaRegEdit className="text-green-800 mt-2 mr-8 h-8 w-6" />
                              </Link>
                              <button onClick={() => openModal(order._id)}>
                                <MdDelete className=" text-red-600 mt-2 mr-8 h-8 w-8" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
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
                <div className="w-3/4 mt-20 ml-32 font-bold flex justify-center rounded text-white place-items-center text-3xl h-20 bg-sky-950">
                  <p>No Orders</p>{" "}
                </div>
              )}
            </div>
          </div>
      )}
        <Outlet />
      </div>

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-10 rounded shadow-md">
            <p>Are you sure you want to delete this order?</p>
            <br />
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={deleteOrder}
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

export default Orders;


