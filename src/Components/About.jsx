import React from "react";
import { Outlet } from "react-router-dom";



function About() {
   const backgroundImageUrl= "/cusproject/public/images/christmasimage.jpg";
    const containerStyle = {
    backgroundImage: `url(${backgroundImageUrl})`,
    backgroundSize: 'cover',
    backgroundPosition:'center',
    width:'100%',
    height:'300px',
     // Optional: Adjust to fit your layout
    // Other Tailwind CSS classes or inline styles...
  };

  return (
    <div style={containerStyle} className="w-full h-full grid bg-cover place-items-center px-10 py-10 mt-10  " >
      
      <div  className="h-full w-full"> 

      <h1 className="text-center text-red-700 font-medium ml-10 text-3xl">ABOUT</h1>
      <div className="ml-60 text-red grid grid-rows-5 gap-10 font-bold mt-10 text-2xl">
         <div >
           * Welcome to the about page of my React Admin project. This admin
            dashboard is designed to provide you with a powerful and intuitive
            interface for managing your data and resources.
          </div>
          <div>
           * Built using React.js, this project leverages the modern frontend
            development practices to ensure a smooth and efficient user
            experience.
          </div>
          <div>
            * The backend is powered by Node.js and MongoDB, offering a scalable
            and flexible solution for storing and retrieving your data. The
            integration of these technologies enables you to create, read,
            update, and delete records seamlessly.
          </div>
          <div>
           * Feel free to explore the various features, such as customer
            management, lead tracking, task scheduling, and more. The responsive
            design ensures that you can access and manage your data on
            different devices.
          </div>
          <div>
            * We are committed to delivering a robust and user-friendly
            application. If you have any feedback or suggestions, please don't
            hesitate to reach out.
          </div>
      </div>
      
     <div>

      <Outlet/>
     </div>
     </div>
    </div>
  );
}
export default About;
