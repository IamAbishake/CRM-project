import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import validator from "validator";

const Addproduct = () => {
  const products = {
    product: "",
    category: "",
    price: "",
    stock: ""
  };
  const [product, setproduct] = useState(products);
  const [errors, setErrors]=useState({});
  const navigate = useNavigate();

  const inputProductHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setproduct({ ...product, [name]: value });
  };


  const submitForm = async (event) => {
    event.preventDefault();
    const errors = {};
     
    if(validator.isEmpty(product.product)){
      errors.product = 'product is required!';
    }
    if(validator.isEmpty(product.category)){
      errors.category = 'category is required!';
    }
    if(validator.isEmpty(product.price)){
      errors.price = 'price is required!';
    }
    if(validator.isEmpty(product.stock)){
      errors.stock = 'stock is required!';
    }
    if(Object.keys(errors).length > 0){
      setErrors(errors);
    }
     else {
    await axios
      .post("https://crm-mernapp.onrender.com/api/createproduct", product)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/Product");
      })
      .catch((error) => {
        console.log(error);
      });
  };
;}

  return (
    <div className="w-full h-full mt-24  grid grid-cols-1 place-items-center">
      <form
        onSubmit={submitForm}
        className="px-8 h-full w-96 py-8  shadow-2xl bg-white rounded-2xl shadow-black"
      >
        <div className="mb-6">
          <h1 className="text-center text-sky-500 font-bold text-3xl">Add product</h1>
          <label
            htmlFor="product"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Product
          </label>
          {errors.product && <small style ={{color:"red",marginLeft:"10px"}}>{errors.product}</small>}
          <input
            type="text"
            id="product"
            name="product"
            value={product.product} 
            onChange={inputProductHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Product Name"
            
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="category"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Category
          </label>
          {errors.category && <small style ={{color:"red",marginLeft:"10px"}}>{errors.category}</small>}
          <input
            type="text"
            id="category"
            name="category"
            value={product.category}
            onChange={inputProductHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Category Name"
            
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="price"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Price (USD)
          </label>
          {errors.price && <small style ={{color:"red",marginLeft:"10px"}}>{errors.price}</small>}
          <input
            type="price"
            id="price"
            name="price"
            value={product.price}
            onChange={inputProductHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your price"
            
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="stock"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Stock
          </label>
          {errors.stock && <small style ={{color:"red",marginLeft:"10px"}}>{errors.stock}</small>}
          <input
            type="stock"
            id="stock"
            name="stock"
            value={product.stock}
            onChange={inputProductHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Stock"
            
          />
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <button
            type="submit"
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
             font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add product
          </button>
          <Link
            to={"/Product"}
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
             dark:focus:ring-blue-800"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Addproduct;
