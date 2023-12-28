import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

function Updateorder() {
  const orders = {
    customer: "",
    orderno: "",
    quantity: "",
    amount: "",
  };

  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrders] = useState(orders);

  const inputChangeHandler = (e) => {
    const { name, value } = e.target;
    setOrders({ ...order, [name]: value });
    console.log(order);
  };
  useEffect(() => {
    axios
      .get(`https://crm-backend-wyng.onrender.com/api/getOneorder/${id}`)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.log("hi this is problem");
      });
  }, [id]);

  const submitForm = async (e) => {
    e.preventDefault();
    await axios
      .put(`https://crm-backend-wyng.onrender.com/api/updateorder/${id}`, order)
      .then((response) => {
        toast.success(response.data.msg, { position: "top-right" });
        navigate("/Orders");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="w-full h-full mt-24  grid grid-cols-1 place-items-center">
      <form
        className="px-8 h-full w-96 py-8  shadow-2xl bg-white rounded-2xl shadow-black"
        onSubmit={submitForm}
        >
        <h1 className="font-bold text-center text-sky-500 text-3xl">Update Order</h1>
        <div className="mb-6">
          <label
            htmlFor="customer"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Customer
          </label>
          <input
            type="text"
            id="customer"
            name="customer"
            onChange={inputChangeHandler}
            value={order.customer}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="customer name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="orderno"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Order No
          </label>
          <input
            type="text"
            id="orderno"
            name="orderno"
            onChange={inputChangeHandler}
            value={order.orderno}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="orderno"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="quantity"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Quantity
          </label>
          <input
            type="quantity"
            id="quantity"
            name="quantity"
            onChange={inputChangeHandler}
            value={order.quantity}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="quantity"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="amount"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Amount
          </label>
          <input
            type="amount"
            id="amount"
            name="amount"
            onChange={inputChangeHandler}
            value={order.amount}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="amount"
            required
          />
        </div>

        <div className="flex gap-2 flex-row-reverse">
          <button
            type="submit"
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Save
          </button>
          <Link
            to={"/Orders"}
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
}

export default Updateorder;
