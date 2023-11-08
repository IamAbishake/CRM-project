import React from "react";
import { HiOutlineSearch } from "react-icons/hi";

export default function Header() {
  return (
    <div className="  bg-white w-screen h-16 px-4 flex justify-between items-center">
      <div className="relative"></div>
      <HiOutlineSearch fontSize={20} className="text-gray-400 absolute"/>
      <div>
        <input
          type="text"
          placeholder="search..."
          className="text-sm focus:outline-none active:outline-none h-10 w-50 border border-gray-300 rounded-sm px-4"
        />
      </div>
      <div>side buttons</div>
    </div>
  );
}
