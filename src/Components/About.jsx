import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
function About() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-full grid place-items-center px-20 py-20 mt-10  " >
      
      <div className="h-50 w-96  "> 

      <h1 className="text-center text-5xl">About</h1>
      </div>
      
     <div>

      <Outlet/>
     </div>
    </div>
  );
}
export default About;
