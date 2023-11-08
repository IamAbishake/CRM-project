import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Outlet } from "react-router-dom";

function Customer() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>this is the Customer page</h1>

      {/* <Outlet /> */}
    </div>
  );
}
export default Customer;
