import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import validator from "validator";

const Adduser = () => {
  const users = {
    fname: "",
    lname: "",
    email: "",
    password: "",
  };

  const [user, setUser] = useState(users);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const inputHandler = (event) => {
    event.preventDefault();
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const submitForm = async (event) => {
    event.preventDefault();
    
    
    const errors = {};

    if (validator.isEmpty(user.fname)) {
      errors.fname = "first name is required!";
    }

    if (validator.isEmpty(user.lname)) {
      errors.lname = "last name is required!";
    }

    if (validator.isEmpty(user.email)) {
      errors.email = "email is required!";
    } else if (!validator.isEmail(user.email)) {
      errors.email = "invalid email address!";
    }
    
    if (validator.isEmpty(user.password)) {
      errors.password = "password is required!";
    } else if (!validator.isStrongPassword(user.password)) {
      errors.password = "enter a strong password!";
    }


    if (Object.keys(errors).length > 0) {
      setErrors(errors);
    } else {
      await axios
        .post("http://localhost:8000/api/create", user)
        .then((response) => {
          toast.success(response.data.msg, { position: "top-right" });
          navigate("/Customer");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div className="w-full h-full mt-24  grid grid-cols-1 place-items-center ">
      <form
        onSubmit={submitForm}
        className="px-8 h-full w-96 py-8  shadow-2xl bg-white rounded-2xl shadow-black"
      >
        <div className="mb-6">
          <h1 className="text-center  font-bold text-3xl">ADD USER</h1>
          <label
            htmlFor="fname"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            First Name
          </label>
          {errors.fname && (
            <small style={{ color: "red", marginLeft: "10px" }}>
              {errors.fname}
            </small>
          )}
          <input
            type="text"
            id="fname"
            name="fname"
            value={user.fname}
            onChange={inputHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full p-2.5"
            placeholder="First Name"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="lname"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Last Name
          </label>
          {errors.lname && (
            <small style={{ color: "red", marginLeft: "10px" }}>
              {errors.lname}
            </small>
          )}
          <input
            type="text"
            id="lname"
            name="lname"
            value={user.lname}
            onChange={inputHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Last Name"
          />
        </div>

        <div className="mb-6">
          <label
            htmlFor="email"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Email
          </label>
          {errors.email && (
            <small style={{ color: "red", marginLeft: "10px" }}>
              {errors.email}
            </small>
          )}

          <input
            type="text"
            id="email"
            name="email"
            value={user.email}
            onChange={inputHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500  w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Your Email"
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className=" mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            Password
          </label>
          {errors.password && (
            <small style={{ color: "red", marginLeft: "10px" }}>
              {errors.password}
            </small>
          )}
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={inputHandler}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500
             focus:border-blue-500 w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400
              dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Password"
          />
        </div>
        <div className="flex gap-2 flex-row-reverse">
          <button
            type="submit"
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
             font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600
              dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Add User
          </button>
          <Link
            to={"/Customer"}
            className="text-white bg-sky-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 
            font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
             dark:focus:ring-blue-800"
          >
            Back
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Adduser;
