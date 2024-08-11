import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { HiOutlineLogin, HiOutlineLogout } from "react-icons/hi";
import { GrUserAdmin } from "react-icons/gr";
import { CgProfile } from "react-icons/cg";
import { FaCartPlus } from "react-icons/fa";

axios.defaults.withCredentials = true;

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
        <Link to="/" className="text-2xl">KIRMADA</Link>
      </div>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <button onClick={logout} ><HiOutlineLogout /></button>
            <Link to="/owner"><GrUserAdmin /></Link>
            <Link to={`/profile/${userName}`}><CgProfile /></Link>
            <Link to="/cart"><FaCartPlus /></Link>
          </>
        ) : (
          <Link to="/login"><HiOutlineLogin /></Link>
        )}
      </div>
    </div>
  );
};

export default navbar;
