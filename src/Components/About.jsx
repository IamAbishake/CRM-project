import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { Outlet } from "react-router-dom";
function About() {
  const navigate = useNavigate();
  return (
    <div>
      <h1>this is the About page</h1>
    

      {/* <Outlet/> */}
    </div>
  );
}
export default About;
