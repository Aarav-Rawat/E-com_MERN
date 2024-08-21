import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

axios.defaults.withCredentials = true;

const navbar = ({
  isAuthenticated,
  setIsAuthenticated,
  setUserName,
  userName,
}) => {
  const logout = async () => {
    try {
      const response = await axios.get(process.env.backend + "/logout", {
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
    <div className=" flex justify-between items-center px-5 h-[8vh] text-xl tracking-tighter bg-white">
      <div>
        <img src="" alt="" />
        <Link to="/" className="text-2xl">
          Verzatile
          {/* <span className="">by Verzatile</span> */}
        </Link>
      </div>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <Link to="/login">Login</Link>
            <button onClick={logout}>Logout</button>
            <Link to="/owner">Admin</Link>
            <Link to={`/profile/${userName}`}>Profile</Link>
            <Link to="/cart">Cart</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </div>
    </div>
  );
};

export default navbar;
