import React from "react";
// import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";
import User from "./users/User";

// https://customer-vwy2.onrender.com/ - link for json data

function Customer() {
  // const navigate = useNavigate();
  return (
    <div>
      <div>
       <User/>
      <Outlet/>
      </div>
    </div>
  );
}
export default Customer;
