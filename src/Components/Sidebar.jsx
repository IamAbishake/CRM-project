import React from "react";
import { Link, Outlet } from "react-router-dom";
import {
  FaChartLine,
  FaUser,
  FaShoppingCart,
  FaInfoCircle,
  FaStoreAlt,
} from "react-icons/fa";

const SideBar = () => {
  return (
    <div className=" bg-gray-900 text-white  rounded shadow-lg flex flex-col w-60 p-3">
      <div>
        <h1 className="w-30 shadow-lg text-center text-white bg-gray shadow-slate-500/100 py-3 rounded text-3xl">
          Admin
        </h1>
        <div className="bg-black-600  text-xl  text-slate-400  pt-5">
          <div className=" p-4  hover:bg-slate-600  hover:text-white ">
            <Link className="" to={"/"}>
              <FaChartLine className="w-6 h-6 inline-block mr-5" /> DashBoard
            </Link>
          </div>
          <div className="p-4 hover:bg-slate-600  hover:text-white ">
            <Link to={"/Customer"}>
              <FaUser className="w-6 h-6 inline-block mr-5" />
              Customer
            </Link>
          </div>
          <div className="p-4 hover:bg-slate-600  hover:text-white">
            <Link to={"/Order"}>
              <FaShoppingCart className="w-6 h-6 inline-block mr-5" />
              Order
            </Link>
          </div>
          <div className="p-4 hover:bg-slate-600  hover:text-white">
            <Link to={"/Product"}>
              <FaStoreAlt className="w-6 h-6 inline-block mr-5" />
              Product
            </Link>
          </div>
          <div className="p-4 hover:bg-slate-600  hover:text-white">
            <Link to={"/About"}>
              <FaInfoCircle className="w-6 h-6 inline-block mr-5" />
              About
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
