import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";

const User = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get("http://localhost:8000/api/getall");
      setUsers(response.data);
    };
    fetchData();
  }, []);

  const deleteUser = async (userId) => {
    await axios
      .delete(`http://localhost:8000/api/delete/${userId}`)
      .then((response) => {
        setUsers((prevUser) => prevUser.filter((user) => user._id !== userId));
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div style={{ backgroundColor: "slategrey" }}>
      <div className=" w-3/4 h-3/4 mb-10 mt-28 border-none ml-72 rounded-lg">
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
            <div className="mt-8 ml-4">
              <Link
                className="text-white bg-blue-700 hover:bg-blue-800 shadow-lg shadow-black ml-28 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                to={"/Customer/Adduser"}
              >
                ADD USER
              </Link>
            </div>
            <div>
              {users.length > 0 ? (
                <div className="flex ml-28 justify-center w-3/4 ">
                  <table className="w-5/6 text-base mt-10 ml-10 rounded-3xl mr-2 mb-10 min-w-full text-left shadow-2xl shadow-black  text-gray-500 dark:text-gray-400">
                    <thead className=" text-white uppercase whitespace-nowrap bg-gray-800 border-b ">
                      <tr className="text-base">
                        <th className="px-6 py-3 ">S.NO</th>
                        <th className="px-6 py-3 ">User Name</th>
                        <th className="px-6 py-3 ">Email</th>
                        <th className="px-6 py-3 ">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-black">
                      {users.map((user, index) => {
                        return (
                          <tr
                            className="border-b-2 odd:bg-white even:bg-gray-200 whitespace-nowrap dark:border-gray-800"
                            key={user._id}
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              {index + 1}.
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {user.fname}
                              {user.lname}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {user.email}
                            </td>
                            <td className="flex justify-around">
                              <Link
                                className=""
                                to={`/Customer/edit/` + user._id}
                              >
                                <FaRegEdit className="text-green-800 mt-2 mr-8 h-8 w-6" />
                              </Link>
                              <button onClick={() => deleteUser(user._id)}>
                                <MdDelete className=" text-red-600 mt-2 mr-8 h-8 w-8" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="w-3/4 mt-20 ml-32 font-bold flex justify-center rounded place-items-center text-3xl h-20 bg-gray-300 ">
                  <p>No Users</p>{" "}
                </div>
              )}
            </div>

            <Outlet />
          </div>
        )}
      </div>
    </div>
  );
};

export default User;
