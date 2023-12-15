import React, { useState } from "react";
import { Link } from "react-router-dom";
import { GiHamburgerMenu } from "react-icons/gi";
import { LiaAsymmetrik } from "react-icons/lia";
import {
  FaChartLine,
  FaUser,
  FaShoppingCart,
  FaInfoCircle,
  FaStoreAlt,
} from "react-icons/fa";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(true);
  const toggleBar = () => setIsOpen(!isOpen);

  return (
    <div>
      {isOpen ? (
        <div className="bg-sky-950  z-20 h-screen w-60 fixed shadow-black shadow-md ">
          <div className="grid bg-transparent place-items-center grid-cols-2 ">
           <div className="h-16 w-12 grid grid-cols-2 text-red-600 gap-5 place-items-center">
           <LiaAsymmetrik className="h-16 w-12 " />
           <h1 className=" font-extrabold mt-2 ml-3 text-red-600 animate-bounce text-3xl">rk</h1>
           </div>
           <GiHamburgerMenu
              className=" text-sky-500   hover:text-sky-700 hover:cursor-pointer ml-12 h-8 w-8"
              onClick={toggleBar}
            />
          </div>
          <div className="grid grid-cols-1  px-3 py-3 text-sky-500 bg-transparent  hover:bg-sky-900 hover:text-white">
            <Link className="" to={"/Dashboard"}>
              <FaChartLine className="w-12  h-6 hover:text-sky-500 inline-block mr-5" />
              Dashboard
            </Link>
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-sky-500 bg-transparent  hover:bg-sky-900 hover:text-white">
            <Link to={"/Customer"}>
              <FaUser className="w-12 h-6 hover:text-sky-500 inline-block mr-5" />
              Customer
            </Link>
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-sky-500 bg-transparent  hover:bg-sky-900 hover:text-white">
            <Link to={"/Orders"}>
              <FaShoppingCart className="w-12 h-6 hover:text-sky-500  inline-block mr-5" />
              Orders
            </Link>
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-sky-500 bg-transparent  hover:bg-sky-900 hover:text-white">
            <Link to={"/Product"}>
              <FaStoreAlt className="w-12 h-6 hover:text-sky-500  inline-block mr-5" />
              Product
            </Link>
          </div>
          <div className="grid grid-cols-1 px-3 py-3 text-sky-500 bg-transparent  hover:bg-sky-900 hover:text-white">
            <Link to={"/About"}>
              <FaInfoCircle className="w-12 h-6 hover:text-sky-500  inline-block mr-5" />
              About
            </Link>
          </div>
        </div>
      ) : (
        <div className=" bg-sky-950 z-20 h-screen fixed shadow-black shadow-lg ">
           <div className="grid grid-row-2 place-items-center">
            <div> <LiaAsymmetrik className="h-14 animate-pulse text-red-600 w-14" />
            </div>
            <div className=" hover:cursor-pointer text-sky-500  grid place-items-center  h-14 w-14  ">
            <GiHamburgerMenu onClick={toggleBar} className="hover:text-sky-700 h-8 w-8" />
            </div></div>
          <div className="grid grid-rows-5 place-items-center w-14 ">
            <div className=" grid place-items-center text-sky-500 hover:text-white hover:bg-sky-800 h-14 w-14 ">
              <Link to={"/Dashboard"}>
                <FaChartLine className="  h-6 w-6 " />
              </Link>
            </div>
            <div className=" grid place-items-center text-sky-500 hover:text-white hover:bg-sky-800 h-14 w-14 ">
              <Link to={"/Customer"}>
                <FaUser className=" h-6 w-6  " />
              </Link>
            </div>
            <div className=" grid place-items-center text-sky-500 hover:text-white hover:bg-sky-800 h-14 w-14 ">
              <Link to={"/Orders"}> 
                <FaShoppingCart className="  h-6 w-6  " />
              </Link>
            </div>
            <div className=" grid place-items-center text-sky-500 hover:text-white hover:bg-sky-800  h-14 w-14">
              <Link to={"/Product"}>
                <FaStoreAlt className="  h-6 w-6  " />
              </Link>
            </div>
            <div className=" grid place-items-center text-sky-500 hover:text-white hover:bg-sky-800 h-14 w-14 ">
              <Link to={"/About"}>
                <FaInfoCircle className="h-6 w-6    " />
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SideBar;
