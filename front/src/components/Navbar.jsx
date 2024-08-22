import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_URL } from "./config";

axios.defaults.withCredentials = true;

const navbar = ({
  isAuthenticated,
  setIsAuthenticated,
  setUserName,
  userName,
}) => {
  const logout = async () => {
    try {
      const response = await axios.get(backend_URL+ "/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      // setIsAuthenticated(false);
      setUserName(null);
      toast.success(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" flex justify-between items-center px-5 h-[8vh] text-xl tracking-tighter bg-[#E0E6EC]">
      <div>
        <img src="" alt="" />
        <Link to="/" className="text-3xl font-bold text-blue-600">
          Shopz
          {/* <span className="">by Verzatile</span> */}
        </Link>
      </div>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <Link  to="/login" className="bg-blue-600 px-2 rounded-xl text-white hover:opacity-85">Login</Link>
            <button className="bg-blue-600 px-2 rounded-xl text-white hover:opacity-85" onClick={logout}>Logout</button>
            <Link className="bg-blue-600 px-2 rounded-xl text-white hover:opacity-85" to="/owner">Admin</Link>
            <Link className="bg-blue-600 px-2 rounded-xl text-white hover:opacity-85" to={`/profile/${userName}`}>Profile</Link>
            <Link className="bg-blue-600 px-2 rounded-xl text-white hover:opacity-85" to="/cart">Cart</Link>
          </>
        ) : (
          <Link className="bg-blue-600 px-2 rounded-xl text-white hover:opacity-85" to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default navbar;


