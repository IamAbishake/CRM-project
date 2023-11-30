import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";

const Orders = () => {
  
  const [Order, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    },1000);
  }, []); 

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getallorder");
      setOrders(response.data);
    };
    fetchData();
  }, []);

  const deleteOrder = async (orderid) => {
    await axios
      .delete(`http://localhost:8000/api/deleteorder/${orderid}`)
      .then((response) => {
        setOrders((prevOrder) =>
          prevOrder.filter((order) => order._id !== orderid)
        );
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };
      
  return (
    <div>
      <div
        style={{ backgroundColor: "slategrey" }}
        className=" w-3/4 h-3/4 mb-10 mt-28 ml-72 mr-16 border-none rounded-sm"
      >
          {
          loading ?( <div className="grid place-items-center mt-52">
          <BarLoader color="#36d7b7" width={200} height={6} loading={loading} speedMultiplier={2} /></div>)
         :(
        <div>
        <div className="mt-8 ml-4">
          <Link
            className="text-white bg-blue-700 hover:bg-blue-800 shadow-lg shadow-black ml-28 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            to={"/Orders/Addorder"}
          >
            ADD order
          </Link>
        </div>
        <div>
          { Order.length > 0 ?(

            <div className="flex ml-28  justify-center w-3/4 ">
          <table className="w-5/6 text-base mt-10 ml-10 mr-2 mb-10 min-w-full text-left shadow-2xl shadow-black  text-gray-500 dark:text-gray-400">
            <thead className=" text-white uppercase whitespace-nowrap bg-gray-800 border-b ">
              <tr className="text-base">
                <th className="px-6 py-3 ">S.NO</th>
                <th className="px-6 py-3 ">Cus Name</th>
                <th className="px-6 py-3 ">Order ID</th>
                <th className="px-6 py-3 ">Quantity</th>
                <th className="px-6 py-3 ">Amount</th>
                <th className="px-6 py-3 ">Actions</th>
              </tr>
            </thead>
            <tbody  className="text-black">
              {Order.map((order, index) => {
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
                    <td className="flex justify-around">
                      <Link
                        className=""
                        to={`/Orders/updateorder/` + order._id}
                        >
                        <FaRegEdit className="text-green-800 mt-2 mr-8 h-8 w-6" />
                      </Link>
                      <button onClick={() => deleteOrder(order._id)}>
                        <MdDelete className=" text-red-600 mt-2 mr-8 h-8 w-8" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
             
             ):(<div className="w-3/4 mt-20 ml-32 font-bold flex justify-center rounded place-items-center text-3xl h-20 bg-gray-300 "><p>No Orders</p> </div>)}
             </div>
      </div>
         )}
      <Outlet />
      </div>

    </div>
  );
};

export default Orders;
