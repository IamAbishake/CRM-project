import React
, { useEffect, useState } 
from "react";
import { MdLogout } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { LiaAsymmetrik } from "react-icons/lia";
import { SiGithub } from "react-icons/si";
import { Link } from "react-router-dom";


export default function Header() {
  const [logout, setLogout] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("auth")) 
    navigate("/login"); // eslint-disable-next-line 
  }, [logout]);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.removeItem("auth");
    setLogout(true);
  };

  return (
    <div className=" grid grid-cols-8 z-20 grid-flow-col-dense place-items-center bg-sky-950 fixed  w-screen min-w-max border-collapse shadow-slate-400 shadow-md  h-16">
      <div></div>
      <div className=" text-center grid grid-cols-2 place-items-center col-span-6">
      <LiaAsymmetrik className="h-16 text-lg text-red-600 w-12 " />
        <h1 className=" font-extrabold mt-2 mr-4 text-red-600  text-3xl">rk</h1>
      </div>
      <div><Link to={"https://github.com/IamAbishake/CRM-project"} >
      <SiGithub className="w-8 h-8 ml-16 text-white hover:text-black " />
      </Link>
      </div>
      <div className="group relative w-24 mr-6">
        <button
          type="button"
          onClick={handleLogout}
          className="grid grid-cols-2 hover:border-2 hover:border-red-600  place-items-center text-red-600
        font-bold rounded-full text-xl mt-2 pr-2 py-2 
        text-center mb-2 "
        >
          <MdLogout className="hover:animate-spin " /><span className="text-base pr-1 text-red-600">Logout</span>
        </button>
        <div className="absolute hidden bg-white text-gray-800 p-2 shadow-md opacity-0 group-hover:opacity-100 transition-opacity">
          Hover Text
        </div>
      </div>
    </div>
  );
}
