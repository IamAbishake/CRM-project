import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaRegEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import toast from "react-hot-toast";
import axios from "axios";
import ReactPaginate from "react-paginate";
import BarLoader from "react-spinners/BarLoader";
import { GoSearch } from "react-icons/go";


const Product = () => {
  const [products, setProducts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [loading, setLoading]= useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  
  const productsPerPage = 5;
  const pagesVisited = currentPage * productsPerPage;


  useEffect(() => {
    const fetchData = async () => {
      try {
      const response = await axios.get(
        "https://crm-mernapp.onrender.com/api/getallproduct"
      );
      setProducts(response.data);
    } catch (error){
      console.error("error fetching data", error);
    } finally {
      setLoading(false);
    }
    };

    fetchData();
  }, []);

  
  useEffect(() => {
    // Filter the products based on the search term
    const filtered = products.filter((product) =>
      product.product.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(filtered);
  }, [searchTerm, products]);

  const openModal = (productId) => {
    setSelectedProductId(productId);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedProductId(null);
    setIsModalOpen(false);
  };

  
  const handleSearch = () => {
    // Filter the products based on the search term
    const filtered = products.filter((product) =>
      product.product.toUpperCase().includes(searchTerm.toUpperCase())
    );
  
    // Update the filtered products and reset the current page to 0
    setFilteredProducts(filtered);
    setCurrentPage(0);
  };


  const deleteProduct = async () => {
    if (selectedProductId) {
      try {
        const response = await axios.delete(
          `https://crm-mernapp.onrender.com/api/deleteproduct/${selectedProductId}`
        );
        setProducts((prevProducts) =>
          prevProducts.filter((product) => product._id !== selectedProductId)
        );
        toast.success(response.data.msg, { position: "top-right" });
      } catch (error) {
        console.log(error);
      } finally {
        closeModal();
      }
    }
  };

   
  const pageCount = Math.ceil(products.length / productsPerPage);

  const changePage = ({ selected }) => {
    setCurrentPage(selected);
  };

  return (
    <>
      <div>
        <nav
          className="w-3/4 h-3/4 mb-10 mt-28 bg-white ml-72 mr-16 border-none  rounded-lg"
        > {loading ? (
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
         
            <div className="w-5/6">
              <div>
              
              <div className="grid grid-cols-3 place-items-center ml-4 mt-4">
              <Link
                  className="text-white bg-sky-500 hover:bg-sky-700 shadow-lg shadow-black ml-20 font-medium rounded-lg text-sm px-3 py-2.5 text-center "
                  to={"/Product/Addproduct"}
                >
                  ADD PRODUCT +
                </Link>
                <input
                  type="text"
                  placeholder="Search by Products Name"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="border w-80 ml-40 border-gray-400 p-2 rounded-md"
                />
                <button
                  className="px-1 py-1 mr-28 bg-sky-500 hover:bg-blue-600 text-white border border-gray-400 font-bold  rounded"
                  onClick={handleSearch}
                >
                 <GoSearch className="w-8 h-8" />
                </button>
              </div>
                {filteredProducts.length > 0 ? (
                  <div className="flex-row">
                  <table
                    className="w-3/6 text-base mt-10 ml-20 mb-10 min-w-full  shadow-2xl shadow-black 
       text-gray-500 dark:text-gray-400 bg-gray-100"
                  >
                    <thead className="text-white text-left text-lg uppercase  bg-sky-500">
                      <tr>
                        <th className="px-6 py-3">S.NO</th>
                        <th className="px-6 py-3">Product</th>
                        <th className="px-6 py-3">Category</th>
                        <th className="px-6 py-3">Price</th>
                        <th className="px-6 py-3">Stock</th>
                        <th className="px-6 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-black text-base">
                      {filteredProducts
                      .slice(pagesVisited, pagesVisited + productsPerPage)
                      .map((product, index) => {
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
                            <td className="flex ml-2 justify-start ">
                              <Link
                                className=""
                                to={`/Product/updateproduct/` + product._id}
                              >
                                <FaRegEdit className=" text-green-800 mt-2 mr-16 h-8 w-6" />
                              </Link>
                              <button onClick={() => openModal(product._id)}>
                                <MdDelete className="text-red-600 mt-2 mr-16 h-8 w-8" />
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
                    containerClassName={"pagination mt-5 ml-[380px] flex space-x-2"}
                    previousLinkClassName={"px-3 py-2 bg-gray-300 text-gray-700 rounded-md"}
                    nextLinkClassName={"px-3 py-2 bg-gray-300 text-gray-700 rounded-md"}
                    disabledClassName={"pagination__link--disabled"}
                    activeClassName={"bg-sky-500 text-white px-3 rounded-md"}
                  />        
                  </div>
                ) : (
                  <div className="w-3/4 mt-20 ml-32 font-bold flex justify-center text-white rounded place-items-center text-3xl h-20 bg-sky-950 ">
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

      {isModalOpen && (
        <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-10 rounded shadow-md">
            <p>Are you sure you want to delete this product?</p>
            <br />
            <div className="flex justify-end">
              <button
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mr-4"
                onClick={deleteProduct}
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
    </>
  );
};

export default Product;






