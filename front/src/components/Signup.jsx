import React, { useState } from "react";
import axios from "axios";

const Signup = () => {
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    contact: "",
    password: ""
  })

  const handleChange = (e)=>{
    const {name,value} = e.target;
    const temp = {...signupInfo};
    temp[name] = value;
    setSignupInfo(temp);
  }

  const userRegistrationSubmit = async (e) => {
    e.preventDefault();
    const {fullname,email,contact,password} = signupInfo;
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
      <div>Kirmada</div>
      <div className="container flex items-center justify-around mt-16">
        <div className="log-in flex items-center justify-between flex-col gap-2">
          <span>welcome to Kirmada</span>
          <span>sign up</span>
          <form
            onSubmit={userRegistrationSubmit}
            className="flex items-center justify-between flex-col gap-3 w-full"
          >
            <input
             className="w-[300px] px-2 py-1 rounded-md"
              type="text"
              placeholder="fullname"
              name="fullname"
              onChange={handleChange}
           
            />
            <input
              className="w-[300px] px-2 py-1 rounded-md"
              type="email"
              placeholder="email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="w-[300px] px-2 py-1 rounded-md"
              type="number"
              placeholder="contact"
              name="contact"
              onChange={handleChange}
            />
            <input
              className="w-[300px] px-2 py-1 rounded-md"
              type="password"
              placeholder="password"
              name="password"
              onChange={handleChange}
            />

            <button type="submit" className="bg-blue-500 px-2 py-1 rounded-md">Sign In </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
