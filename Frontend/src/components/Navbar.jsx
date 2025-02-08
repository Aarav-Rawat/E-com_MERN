import axios from "axios";
import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_URL } from "./config";
import { myContext } from "../context/context";

axios.defaults.withCredentials = true;

const Navbar = ({
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
      toast.success('Logout Successfully');
      value.setToken(null);
      sessionStorage.clear();
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav className="bg-slate-900/80 backdrop-blur-lg border-b border-slate-800/50 sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link 
            to="/" 
            className="flex items-center space-x-2"
          >
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent hover:from-indigo-300 hover:to-purple-300 transition-all duration-300">
              Verzatile
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center space-x-6">
            {isAuthenticated ? (
              <div className="flex items-center space-x-6">
                {isSeller && (
                  <Link
                    to="/owner"
                    className="text-slate-300 hover:text-indigo-400 transition-colors duration-200"
                  >
                    Seller Dashboard
                  </Link>
                )}
                
                <Link
                  to={`/profile/${userName}`}
                  className="text-slate-300 hover:text-indigo-400 transition-colors duration-200"
                >
                  Profile
                </Link>
                
                <Link
                  to="/cart"
                  className="relative group"
                >
                  <div className="p-2 rounded-full bg-slate-800/80 hover:bg-slate-700/80 transition-colors duration-200">
                    <svg className="w-5 h-5 text-slate-300 group-hover:text-indigo-400 transition-colors duration-200" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  </div>
                </Link>

                <Link 
                  to="/orders" 
                  className="text-slate-200 hover:text-indigo-400 transition-colors"
                >
                  Orders
                </Link>
                
                <button
                  onClick={logout}
                  className="px-4 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                >
                  Logout
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
