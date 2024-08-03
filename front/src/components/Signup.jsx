import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const temp = { ...signupInfo };
    temp[name] = value;
    setSignupInfo(temp);
  };

  const userRegistrationSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, contact, password } = signupInfo;
    try {
      const response = await axios.post(
        "http://localhost:3000/user/create",
        {
          fullname,
          email,
          contact,
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
    <div className="p-2 h-screen bg-[#E0E6EC]">
      <div className="container flex items-center justify-around mt-16">
        <div className="log-in flex items-center justify-between flex-col gap-2">
          <span className="text-3xl tracking-tighter">
            welcome to <span className="text-blue-600 font-bold">Kirmada</span>
          </span>
          <span className="text-xl tracking-tighter">Create your Account</span>
          <form
            onSubmit={userRegistrationSubmit}
            className="flex items-center justify-between flex-col gap-3 w-full"
          >
            <input
              className="w-[300px] px-2 py-[6px] rounded-md"
              type="text"
              placeholder="Fullname"
              name="fullname"
              onChange={handleChange}
            />
            <input
              className="w-[300px] px-2 py-[6px]  rounded-md"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="w-[300px] px-2 py-[6px]  rounded-md"
              type="number"
              placeholder="Contact"
              name="contact"
              onChange={handleChange}
            />
            <input
              className="w-[300px] px-2 py-[6px]  rounded-md"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            <input
              type="submit"
              value="Create"
              className="bg-blue-500 px-2 py-1 rounded-xl"
            />
          </form>
          <div className="mb-4">
        Already have a account? <Link className="text-blue-600" to="/login">Login</Link>
      </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
