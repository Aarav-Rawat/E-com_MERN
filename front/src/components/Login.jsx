import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

axios.defaults.withCredentials = true;

const Login = ({ setIsAuthenticated, setUserName }) => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const userLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/user/login",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );



      if (response.data[0] === "Logedin") {
        setIsAuthenticated(true);
        setUserName(response.data[1]);
        toast.success(response.data[0]);
      }
      else{
        toast.error(response.data);
      }
    } catch (err) {
      console.log("Error", err.message);
    }
  };

  return (
    <div className="flex items-center justify-center  flex-col gap-2 h-screen bg-[#E0E6EC]">
      <span className="text-3xl tracking-tighter">
        welcome to <span className="text-blue-600 font-bold">Kirmada</span>
      </span>
      <span className="text-xl tracking-tighter">Enter Account Details</span>
      <form
        onSubmit={userLoginSubmit}
        className="flex items-center flex-col justify-between gap-3"
      >
        <input
          type="email"
          placeholder="E-mail"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-[300px] px-2 py-1 rounded-md outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-[300px] px-2 py-1 rounded-md outline-none"
        />
        <input
          type="submit"
          value="Login"
          className="bg-blue-500 px-2 py-1 rounded-xl outline-none"
        />
      </form>
      <div className="mb-48">
        Don't have account?{" "}
        <Link className="text-blue-600" to="/signup">
          SignUp
        </Link>
      </div>
    </div>
  );
};

export default Login;
