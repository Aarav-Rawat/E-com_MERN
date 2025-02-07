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
    fullname: "",
    email: "",
    password: "",
    seller: "false",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSignupInfo(prev => ({
      ...prev,
      [name]: value
    }));
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
      } else {
        toast.error(response.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-xl shadow-lg">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-2">Create Account</h2>
          <p className="text-gray-600">Join Verzatile today</p>
        </div>

        <form onSubmit={userRegistrationSubmit} className="mt-8 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="fullname" className="sr-only">Full Name</label>
              <input
                type="text"
                id="fullname"
                name="fullname"
                required
                placeholder="Full Name"
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                placeholder="Email address"
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                required
                placeholder="Password"
                onChange={handleChange}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center justify-between px-3">
              <label htmlFor="seller" className="text-gray-700 font-medium">
                Become a Seller?
              </label>
              <select
                id="seller"
                name="seller"
                onChange={handleChange}
                className="ml-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white text-gray-700"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors duration-200"
          >
            Create Account
          </button>
        </form>

        <div className="text-center text-sm">
          <span className="text-gray-600">Already have an account? </span>
          <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
