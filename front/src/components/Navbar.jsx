import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
  const backendURL = "http://localhost:3000";
  const logout = async () => {
    try {
      const response = await axios.get(
        `${backendURL}/logout`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setIsAuthenticated(false);
      setUserName(null);
      toast.success(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className=" flex justify-between items-center px-5 h-[10vh] text-xl tracking-tighter ">
      <div>
        <img src="" alt="" />
        <Link to="/" className="text-2xl">
          KIRMADA
        </Link>
      </div>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <button onClick={logout} className="flex flex-col items-center justify-center">
              <HiOutlineLogout className="text-3xl" /> <span className="text-base">Logout</span>
            </button>
            <Link to="/owner" className="flex flex-col items-center justify-center">
              <GrUserAdmin className="text-3xl" /> <span className="text-base">Admin</span>
            </Link>
            <Link to={`/profile/${userName}`} className="flex flex-col items-center justify-center">
              <CgProfile className="text-3xl" /> <span className="text-base"> Profile</span>
            </Link>
            <Link to="/cart" className="flex flex-col items-center justify-center">
              <FaCartPlus className="text-3xl" /> <span className="text-base">Cart</span>
            </Link>
          </>
        ) : (
          <Link to="/login" className="flex flex-col items-center justify-center">
            <HiOutlineLogin className="text-3xl" /> <span className="text-base">Login</span>
          </Link>
        )}
      </div>
    </div>
  );
};

export default navbar;
