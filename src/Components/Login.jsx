import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [input, setInput] = useState({ email: "", password: "" });
  const [errorMessage, seterrorMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (localStorage.getItem("auth")) navigate("/Dashboard");
  }, []);

  const submitForm = (e) => {
    e.preventDefault();
    if (input.email !== "abi@gmail.com" || input.password !== "abi") return;
    seterrorMessage("");
    navigate("/Dashboard");
    localStorage.setItem("auth", true);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gradient-to-r from-cyan-700 to-pink-900 ">
      <div className="flex justify-center mt-20 h-96 w-72 border-none rounded-2xl bg-transparent shadow-2xl shadow-black  ">
        <form onSubmit={submitForm} className="">
          <h1 className="text-4xl text-center mt-4">Login</h1>
          {seterrorMessage > 0 ? (
            <div style={{ marginBottom: "10px", color: "red" }}>
             <p>invalid email or password</p>
            </div>
          ):("")}
          <div className="grid grid-rows-4 mt-4">
            <label htmlFor="Email" className="py-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              onChange={handleChange}
              required
              placeholder="Email"
              className="py-2 px-2 text-sm rounded-2xl "
            />
            <label htmlFor="" className="py-2">
              Password
            </label>
            <input
              type="password"
              name="password"
              onChange={handleChange}
              required
              placeholder="Password"
              className="py-2 px-2 text-sm rounded-2xl  "
            />

            <button className="mt-14  py-2 rounded-2xl font-bold bg-gradient-to-r from-cyan-500 to-pink-500 hover:to-pink-700 ">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
