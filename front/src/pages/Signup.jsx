import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {backend_URL} from "../components/config"
import { myContext } from "../context/context";
axios.defaults.withCredentials = true;

const Signup = ({ setIsAuthenticated, setUserName, setIsSeller }) => {
  const value = useContext(myContext);
  const [signupInfo, setSignupInfo] = useState({
    name: "",
    email: "",
    password: "",
    seller: "false",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    const temp = { ...signupInfo };
    temp[name] = value;
    setSignupInfo(temp);
  };

  const userRegistrationSubmit = async (e) => {
    e.preventDefault();
    const { fullname, email, password, seller } = signupInfo;

    try {
      const response = await axios.post(
        backend_URL + "/user/create",
        {
          fullname,
          email,
          password,
          seller,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.msg === "Created") {
        setIsAuthenticated(true);
        setUserName(response.data.username);
        toast.success(response.data.msg);
        setIsSeller(response.data.isSeller);
        sessionStorage.setItem('token',JSON.stringify(response.data.token))
        
      }
      toast.error(response.data);
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-2 h-screen text-black">
      <div className="container flex items-center justify-around mt-16">
        <div className="log-in flex items-center justify-between flex-col gap-2">
          <span className="text-3xl tracking-tighter">
            welcome to{" "}
            <span className="text-blue-500 font-bold">Verzatile</span>
          </span>
          <span className="text-xl tracking-tighter">Create your Account</span>
          <form
            onSubmit={userRegistrationSubmit}
            className="flex items-center justify-between flex-col gap-3 w-full"
          >
            <input
              className="w-[300px] px-2 py-[6px] rounded-md outline-none"
              type="text"
              placeholder="Fullname"
              name="fullname"
              onChange={handleChange}
            />
            <input
              className="w-[300px] px-2 py-[6px] outline-none rounded-md"
              type="email"
              placeholder="Email"
              name="email"
              onChange={handleChange}
            />
            <input
              className="w-[300px] px-2 py-[6px] outline-none rounded-md text-black"
              type="password"
              placeholder="Password"
              name="password"
              onChange={handleChange}
            />

            <div className="text-lg flex gap-2">
              <label htmlFor="admin">Become Seller</label>
              <select
                name="seller"
                className="rounded-xl border-blue-500 border-[1.5px] outline-none "
                onChange={handleChange}
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

           

            <input
              type="submit"
              value="Signup"
              className="bg-blue-500 px-2 py-1 rounded-xl outline-none text-white"
            />
          </form>
          <div className="mb-4">
            Already have a account?
            <Link className="text-blue-500" to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
