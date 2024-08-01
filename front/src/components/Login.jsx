import React, { useState } from "react";
import axios from "axios";

const Login = () => {
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

      console.log(response.data);
    } catch (err) {
      console.log("Error", err);
    }
  };

  return (
    <div className="flex items-center flex-col gap-2 h-screen bg-[#E0E6EC]">
      <span>login here!</span>
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
        <input type="submit" value="login" className="bg-blue-500 px-2 py-1 rounded-md"/>
      </form>
    </div>
  );
};

export default Login;
