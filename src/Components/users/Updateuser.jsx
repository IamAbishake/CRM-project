import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';


function Updateuser() {
const users ={
  fname:"",
  lname:"",
  email:""
}

  const {id}= useParams();
  const navigate =useNavigate();
  const [user,setUser] = useState(users);
 
  const inputChangeHandler=(e)=>{
    const {name,value}=e.target;
  setUser({...user, [name]:value});
  console.log(user);
  
}
useEffect(()=>{
  axios.get(`https://crm-backend-wyng.onrender.com/api/getOne/${id}`)
  .then((response)=>{
    setUser(response.data) 
  })
  .catch((error)=>{
    console.log(error);
  })
},[id])

const submitForm=async(e)=>{
  e.preventDefault();
    await axios.put(`https://crm-backend-wyng.onrender.com/api/update/${id}`, user)
    .then((response)=>{
      toast.success(response.data.msg, {position:"top-right"})
       navigate("/Customer")
    }).catch((error)=>{
      console.log(error)
    })
}

  return (
    
<div className="w-full h-full mt-24  grid grid-cols-1 place-items-center">
      <form className="px-8 h-full w-96 py-8  shadow-2xl bg-white rounded-2xl shadow-black" onSubmit={submitForm}>
      <h1 className="font-bold text-center text-sky-500 text-3xl">Update User</h1>
        <div className="mb-6">
          <label
            htmlFor="fname"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First name
          </label>
          <input
            type="text"  id="fname" name='fname'
            onChange={inputChangeHandler} value={user.fname}
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="First Name"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lname"  
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          <input
            type="text" id='lname' name='lname'
            onChange={inputChangeHandler} value={user.lname}
            
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last Name"
            required
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          <input
            type="email" id='email' name='email' 
            onChange={inputChangeHandler} value={user.email}
            
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Email"
            required
          />
        </div>
        
        <div className="flex gap-2 flex-row-reverse">
        <button
          type="submit"
          className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Save
        </button>
        <Link to={"/Customer"} className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
 >Back</Link>
        </div>
      </form>
    </div>
    )
}

export default Updateuser