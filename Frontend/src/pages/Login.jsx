import React, { useContext, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_URL } from "../components/config";
import { myContext } from "../context/context";

const Login = ({ setIsAuthenticated, setUserName, setIsSeller }) => {
  const [email, setEmail] = useState("aarav@gmail.com");
  const [password, setPassword] = useState("aarav");
  const value = useContext(myContext);
  const navigate = useNavigate();

  const userLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${backend_URL}/user/login`, {
        email,
        password,
      });

      if (response.data.msg === "Logedin") {
        setIsAuthenticated(true);
        setUserName(response.data.username);
        setIsSeller(response.data.isSeller);
        // Store token without JSON.stringify
        sessionStorage.setItem("token", response.data.token);
        toast.success("Login Successful");
        navigate("/");
      } else {
        toast.error(response.data);
      }
    } catch (err) {
      toast.error("Login failed");
      console.error("Login error:", err);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        {/* Login Card */}
        <div className="relative bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50 shadow-xl overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

          {/* Header */}
          <div className="relative text-center mb-8">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              Welcome Back
            </h1>
            <p className="text-slate-400">Sign in to your account</p>
          </div>

          {/* Login Form */}
          <form onSubmit={userLoginSubmit} className="relative space-y-6">
            <div>
              <label className="block text-slate-200 font-medium mb-2">Email</label>
              <div className="relative group">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter your password"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 relative overflow-hidden group"
            >
              <span className="relative z-10">Sign In</span>
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </form>

          {/* Footer */}
          <div className="relative mt-8 text-center">
            <p className="text-slate-400">
              Don't have an account?{" "}
              <Link to="/signup" className="text-indigo-400 hover:text-indigo-300 transition-colors">
                Sign up
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
            <span className="text-slate-400 text-sm">Secure login with SSL encryption</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
