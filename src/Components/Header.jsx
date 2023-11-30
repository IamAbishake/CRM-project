import React, { useEffect, useState } from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth")) navigate("/login");
  }, [logout]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setLogout(true);
  };

  return (
    <div className=" grid grid-cols-8 grid-flow-col-dense place-items-center bg-gray-900 z-10 w-screen min-w-max border-collapse shadow-2xl fixed h-16">
      <div></div>
      <div className=" text-center col-span-6">
        <h1 className="text-green-600 font-extrabold text-3xl">MY PROJECT</h1>
      </div>
      <div className="">
        <button
          type="button"
          onClick={handleLogout}
          className="text-white  bg-red-700 hover:bg-red-800
        focus:outline-none  font-bold rounded-full text-xl mt-2 px-3 py-3 
        text-center mb-2 dark:bg-red-600 dark:hover:bg-red-700
        dark:focus:ring-red-900"
        >
          <MdLogout />
        </button>
      </div>
    </div>
  );
}
