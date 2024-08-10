import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
axios.defaults.withCredentials = true;
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const navbar = ({
  isAuthenticated,
  setIsAuthenticated,
  setUserName,
  userName,
}) => {
  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logout", {
        headers: {
          "Content-Type": "application/json",
        },
      });
      setIsAuthenticated(false);
      setUserName(null);
      toast.success(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" flex justify-between items-center px-5 h-[8vh] text-xl tracking-tighter ">
      <div>
        <img src="" alt="" />
        <span className="text-2xl">KIRMADA</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <>
            <button onClick={logout} >Logout</button>
            <Link to="/owner">Owner</Link>
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
