import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Addorder = () => {
  const orders = {
    customer: "",
    orderno: "",
    quantity: "",
    amount: "",

  };
  const [order, setOrders] = useState(orders);
  const navigate = useNavigate();

  const inputOrderHandler = (e) => {
    const { name, value } = e.target;
    setOrders({...order, [name]:value});
    
  }

  const submitForm = async(e)=>{
    e.preventDefault();
    await axios.post("http://localhost:8000/api/createorder", order)
    .then((response)=>{
       toast.success(response.data.msg, {position:"top-right"})
       navigate("/Orders")
    }).catch(error=>{
      if(error.response){
        console.log(error.response.data);
      }
    }
    )
  }

  return (
    <div className="w-full h-full mt-24  grid grid-cols-1 place-items-center">
      <form onSubmit={submitForm} className="px-8 h-full w-96 py-8  shadow-2xl bg-white rounded-2xl shadow-black">
        <div className="mb-6">
          <h1 className="text-center text-sky-500 font-bold text-3xl">ADD ORDER</h1>
          <label
            htmlFor="customer"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Customer
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            onChange={inputOrderHandler}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg
             focus:ring-blue-500 focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600
             dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Customer Name"
            required
            />
        </div>
        <div className="mb-6">
          <label
            htmlFor="orderno"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
           Order ID
          </label>
          <input
            type="text"
            id="orderno"
            name="orderno"
            onChange={inputOrderHandler}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Order ID "
            required
            />
        </div>

        <div className="mb-6">
          <label
            htmlFor="quantity"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantity
          </label>
          <input
            type="quantity"
            id="quantity"
            name="quantity"
            onChange={inputOrderHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Quantity"
            required
            />
        </div>
        <div className="mb-6">
          <label
            htmlFor="amount"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount
          </label>
          <input
            type="amount"
            id="amount"
            name="amount"
            onChange={inputOrderHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Amount"
            required
            />
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <button 
            type="submit"
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
             font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            save
          </button>
          <Link
            to={"/Orders"}
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

export default Addorder;
