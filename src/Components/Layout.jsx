import React from "react";
import { Link, Outlet } from "react-router-dom";
import SideBar from "./Sidebar";
// import { FaSignOutAlt, FaList } from "react-icons/fa";
import Header from "./Header";

const Layout = () => {
  return (
    <div>
      <div className="flex flex-row  bg-slate-300  h-screen w-screen overflow-hidden">
        <SideBar />
        <div>
        {/* <div className="ml-6 w-4/5 h-16">
          <nav className=" flex justify-between h-16 bg-gray-800 mt-2 mr-4 rounded">
            <div className=" flex ml-8 mt-4 gap-2 ">
              <FaList className="bg-black-500  w-8 h-8  text-white rounded shadow-lg" />
              <h1 className=" text-white text-2xl">Menu</h1>
            </div>
            <button
              className=" w-10 h-10 text-white bg-red-500 mr-8 mt-3 shadow-lg shadow-red-500/100 
            hover:text-black rounded"
            >
              <FaSignOutAlt className=" w-6 h-6 inline-block" />
            </button>
          </nav> */}
          </div>
          <Header/>
          <div>
            <Outlet />
          </div>
          
        {/* </div> */}
      </div>
    </div>
  );
};

export default Layout;
