import React from "react";
import {Outlet} from "react-router-dom";
import Header from "./Header";
import SideBar from "./Sidebar";
import BarLoader from "react-spinners/BarLoader";
import { useEffect, useState } from "react";


const Layout = () => {

       
    const [loading,setLoading]=useState(false);
    useEffect(()=>{
      setLoading(true)
      setTimeout(() => {
        setLoading(false)
      },1000);

    },[])

     
  return (
    <div>
      <div className="flex flex-col bg-slate-100">
      <Header/>
      <SideBar/>
      </div>
      {
          loading ?( <div className="grid place-items-center mt-52">
          <BarLoader color="#36d7b7" width={200} height={6} loading={loading} speedMultiplier={2} /></div>)
         :(
      <div>
      <Outlet/>
      </div>
         )}
    </div>

  );
};

export default Layout;
