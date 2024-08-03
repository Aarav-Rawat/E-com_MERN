import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = ({ setIsAuthenticated }) => {
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
          withCredentials: true,
        }
      );

      if (response.data === "Loged-In") {
        setIsAuthenticated(true);
      }
    } catch (err) {
      console.log("Error", err);
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
          placeholder="email"
          name="email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
          className="w-[300px] px-2 py-1 rounded-md"
        />
        <input
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          className="w-[300px] px-2 py-1 rounded-md"
        />
        <input
          type="submit"
          value="Login"
          className="bg-blue-500 px-2 py-1 rounded-xl"
        />
      </form>
      <div className="mb-48">
        Don't have account? <Link className="text-blue-600" to="/signup">SignUp</Link>
      </div>
    </div>
  );
};

export default Login;
