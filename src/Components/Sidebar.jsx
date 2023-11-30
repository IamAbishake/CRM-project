import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TbArrowBarBoth } from "react-icons/tb";

import {
  FaChartLine,
  FaUser,
  FaShoppingCart,
  FaInfoCircle,
  FaStoreAlt,
} from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleBar = (props) => setIsOpen(!isOpen);

  return (
    <div>
      {isOpen ? (
        <div className=" bg-gray-900 z-20 h-screen w-60 text-white fixed shadow-lg  ">
          <div className="grid bg-slate-800 text-green-600 place-items-center grid-cols-3 px-3 py-1.5">
            <h1 className=" text-center font-extrabold col-span-2 px-2 py-2  text-3xl">
              ADMIN
            </h1>
            <TbArrowBarBoth
              className=" text-cyan-300 border border-cyan-500 hover:cursor-pointer h-12 w-12"
              onClick={toggleBar}
            />
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-slate-300 hover:bg-blue-600 hover:text-white">
            <Link to={"/Dashboard"}>
              <FaChartLine className="w-12 h-6 inline-block mr-5" /> Dashboard
            </Link>
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-slate-300 hover:bg-blue-600 hover:text-white">
            <Link to={"/Customer"}>
              <FaUser className="w-12 h-6 inline-block mr-5" />
              Customer
            </Link>
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-slate-300 hover:bg-blue-600 hover:text-white">
            <Link to={"/Orders"}>
              <FaShoppingCart className="w-12 h-6 inline-block mr-5" />
              Orders
            </Link>
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-slate-300 hover:bg-blue-600 hover:text-white">
            <Link to={"/Product"}>
              <FaStoreAlt className="w-12 h-6 inline-block mr-5" />
              Product
            </Link>
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-slate-300 hover:bg-blue-600 hover:text-white">
            <Link to={"/About"}>
              <FaInfoCircle className="w-12 h-6 inline-block mr-5" />
              About
            </Link>
          </div>
        </div>
      ) : (
        <div className=" bg-slate-900 z-20  h-screen text-white fixed">
          <div className="grid grid-rows-6 place-items-center w-16 ">
            <div className=" hover:bg-black  border border-cyan-500  hover:cursor-pointer  grid place-items-center mt-3 text-cyan-300 h-14 w-12 ">
              <TbArrowBarBoth
                onClick={toggleBar}
                className="hover:bg-black h-10 w-8"
              />
            </div>
            <div className="hover:bg-blue-600 grid place-items-center w-12 h-12">
              <Link to={"/Dashboard"}>
                <FaChartLine className="h-6 w-6 " />
              </Link>
            </div>
            <div className="hover:bg-blue-600 grid place-items-center w-12 h-12">
              <Link to={"/Customer"}>
                <FaUser className="h-6 w-6  " />
              </Link>
            </div>
            <div className="hover:bg-blue-600 grid place-items-center w-12 h-12">
              <Link to={"/Orders"}>
                <FaShoppingCart className="h-6 w-6  " />
              </Link>
            </div>
            <div className="hover:bg-blue-600 grid place-items-center w-12 h-12">
              <Link to={"/Product"}>
                <FaStoreAlt className="h-6 w-6  " />
              </Link>
            </div>
            <div className="hover:bg-blue-600 grid place-items-center w-12 h-12">
              <Link to={"/About"}>
                <FaInfoCircle className="h-6 w-6  " />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
