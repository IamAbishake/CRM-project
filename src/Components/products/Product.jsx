import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import BarLoader from "react-spinners/BarLoader";

const Product = () => {
  const [product, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get(
        "http://localhost:8000/api/getallproduct"
      );
      setProducts(response.data);
    };
    fetchData();
  }, []);

  const deleteProduct = async (productId) => {
    await axios
      .delete(`http://localhost:8000/api/deleteproduct/${productId}`)
      .then((response) => {
        setProducts((prevProduct) =>
          prevProduct.filter((product) => product._id !== productId)
        );
        toast.success(response.data.msg, { position: "top-right" });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <div>
        <nav
          style={{ backgroundColor: "slategrey" }}
          className="  w-3/4 h-3/4 mb-10 mt-28  ml-72 mr-16 border-none  rounded-lg"
        >
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
            <div className="w-5/6 ">
              <div className="mt-8 mr-20">
                <Link
                  className="text-white bg-blue-700 hover:bg-blue-800 shadow-lg shadow-black ml-4
         focus:outline-none focus:ring-blue-300 font-medium rounded-lg
         text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  to={"/Product/Addproduct"}
                >
                  ADD PRODUCT
                </Link>
              </div>
              <div>
                {product.length > 0 ? (
                  <table
                    className="w-3/6 text-base mt-10 ml-20 mb-10 min-w-full  shadow-2xl shadow-black 
       text-gray-500 dark:text-gray-400 bg-gray-100"
                  >
                    <thead className=" text-white text-left uppercase  bg-gray-800">
                      <tr text-lg>
                        <th className="px-6 py-3">S.NO</th>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">price</th>
                        <th className="px-6 py-3">Stock</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-black text-base">
                      {product.map((product, index) => {
                        return (
                          <tr
                            className="border-b-2  odd:bg-white even:bg-gray-200 text-base whitespace-nowrap dark:border-gray-800"
                            key={product._id}
                          >
                            <td className="whitespace-nowrap px-6 py-4">
                              {index + 1}.
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.product}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.category}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.price}
                            </td>
                            <td className="whitespace-nowrap px-6 py-4">
                              {product.stock}
                            </td>
                            <td className="flex justify-start ">
                              <Link
                                className=""
                                to={`/Product/updateproduct/` + product._id}
                              >
                                <FaRegEdit className=" text-green-800 mt-2 mr-16 h-8 w-6" />
                              </Link>
                              <button
                                onClick={() => deleteProduct(product._id)}
                              >
                                <MdDelete className="text-red-600 mt-2 mr-16 h-8 w-8" />
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <div className="w-3/4 mt-20 ml-32 font-bold flex justify-center rounded place-items-center text-3xl h-20 bg-gray-300 ">
                    <p>No Products</p>{" "}
                  </div>
                )}
              </div>
              <div>
                <Outlet />
              </div>
            </div>
          )}
        </nav>
      </div>
    </>
  );
};
export default Product;
