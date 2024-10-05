import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_URL } from "./config";
import { myContext } from "../context/context";

axios.defaults.withCredentials = true;

const navbar = ({
  isAuthenticated,
  setIsAuthenticated,
  setUserName,
  userName,
  isSeller,
}) => {

  const value = useContext(myContext);
  const logout = async () => {
    try {
      
      setIsAuthenticated(false);
      setUserName(null);
      toast.success('Logout Sucessfully');
      value.setToken(null);
      sessionStorage.clear();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className=" flex justify-between items-center px-5 h-[8vh] text-xl tracking-tighter">
      <div>
        <img src="" alt="" />
        <Link to="/" className="text-3xl font-bold text-[#3576DF] tracking-normal">
          Verzatile
         
        </Link>
      </div>

      <div className="flex space-x-4">
        {isAuthenticated ? (
          <>
            <button
              className="bg-[#3576DF] px-2 rounded-xl text-white hover:opacity-85"
              onClick={logout}
            >
              Logout
            </button>

            {isSeller ? (
              <Link
                className="bg-[#3576DF] px-2 rounded-xl text-white hover:opacity-85"
                to="/owner"
              >
                Seller
              </Link>
            ) : null}

            <Link
              className="bg-[#3576DF] px-2 rounded-xl text-white hover:opacity-85"
              to={`/profile/${userName}`}
            >
              Profile
            </Link>

            <Link
              className="bg-[#3576DF] px-2 rounded-xl text-white hover:opacity-85"
              to="/cart"
            >
              Cart
            </Link>
          </>
        ) : (
          <Link
            className="bg-[#3576DF] px-2 rounded-xl text-white hover:opacity-85"
            to="/login"
          >
            Login
          </Link>
        )}
      </div>
    </div>
  );
};

export default navbar;
