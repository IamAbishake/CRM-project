import React, {  useEffect,useState } from "react";
import { useNavigate } from "react-router-dom";
import backgroundimages from "./images/abstract.jpg";
import validator from "validator";

const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [errorMessage, setErrorMessage]=useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) 
    navigate("/Dashboard");
  },[navigate]);
  

  const submitForm = (e) => {
    e.preventDefault();
    if(validator.isEmpty(input.email) || validator.isEmpty(input.password))
    return setErrorMessage("enter a email and password !")
    
    if (input.email !== "abi@gmail.com" || input.password !== "abi")
    return setErrorMessage("invalid email or password !");
    localStorage.setItem("auth", true);
       navigate("/Dashboard")      
    }

    return (
      <div
        style={{ backgroundImage: `url(${backgroundimages})` }}
        className="flex justify-center bg-center bg-cover bg-no-repeat items-center w-screen h-screen "
      >
        <div className="flex justify-center h-96 w-72 border-none mr-28 mb-10  rounded-2xl bg-transparent shadow-lg shadow-black">
          <form onSubmit={submitForm} className="">
            <h1 className="text-4xl text-center text-white font-bold mt-4">
              LOGIN
            </h1>
            {errorMessage.length > 0 && (
            <small style={{ color: "red" }}>
              {errorMessage}
            </small>
          )}
            <div className="grid grid-rows-4 mt-4">
              <label
                htmlFor="Email"
                className="py-2 text-xl text-white font-bold"
              >
                Email
              </label>
              <input
                type="text"
                name="email"
                onChange={handleChange}
                placeholder="Email"
                className="py-2 px-2 text-white border-none text-sm rounded-2xl bg-transparent "
              />
              <label htmlFor="" className="py-2 text-xl font-bold text-white">
                Password
              </label>
              <input
                type="password"
                name="password"
                onChange={handleChange}
                placeholder="Password"
                className="py-2 px-2 text-sm  text-white rounded-2xl bg-transparent"
              />

              <button  className="mt-14  py-2 rounded-2xl font-bold text-xl bg-white opacity-85 text-black ">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };


export default Login;
