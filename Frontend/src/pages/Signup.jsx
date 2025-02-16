import React, { useContext, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_URL } from "../components/config";
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
    setSignupInfo((prev) => ({
      ...prev,
      [name]: value,
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
          }
        }
      );

      if (response.data.msg === "Created") {
        setIsAuthenticated(true);
        setUserName(response.data.username);
        toast.success(response.data.msg);
        setIsSeller(response.data.isSeller);
        sessionStorage.setItem("token", JSON.stringify(response.data.token));
      } else {
        toast.error(response.data);
      }
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Signup Card */}
        <div className="relative bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50 shadow-xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          {/* Header */}
          <div className="relative text-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              Create Account
            </h1>
            <p className="text-slate-400">Join Verzatile today</p>
          </div>

          {/* Signup Form */}
          <form onSubmit={userRegistrationSubmit} className="relative space-y-6">
            <div>
              <label className="block text-slate-200 font-medium mb-2">Full Name</label>
              <div className="relative group">
                <input
                  type="text"
                  name="fullname"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your full name"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div>
              <label className="block text-slate-200 font-medium mb-2">Email</label>
              <div className="relative group">
                <input
                  type="email"
                  name="email"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div>
              <label className="block text-slate-200 font-medium mb-2">Password</label>
              <div className="relative group">
                <input
                  type="password"
                  name="password"
                  required
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <div className="flex items-center justify-between px-3">
              <label className="text-slate-200 font-medium">Become a Seller?</label>
              <select
                name="seller"
                onChange={handleChange}
                className="ml-4 px-4 py-2 border border-slate-700/50 rounded-xl bg-slate-900/50 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
              >
                <option value="false">No</option>
                <option value="true">Yes</option>
              </select>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 relative overflow-hidden group"
            >
              <span className="relative z-10">Create Account</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Footer */}
          <div className="relative mt-8 text-center">
            <p className="text-slate-400">
              Already have an account?{" "}
              <Link to="/login" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Security Badge */}
        <div className="mt-8 text-center">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 border border-slate-700/50">
            <svg className="w-5 h-5 text-emerald-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            <span className="text-slate-400 text-sm">Secure signup with SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
