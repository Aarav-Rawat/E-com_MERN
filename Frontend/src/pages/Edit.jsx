import React, { useContext, useState } from "react";
import axios from "axios";
import { backend_URL } from "../components/config";
import { toast } from "react-toastify";
import { myContext } from "../context/context";
import { useNavigate } from "react-router-dom";

const Edit = ({ setUserName }) => {
  const [userInfo, setUserInfo] = useState({
    newName: "",
    newEmail: "",
  });
  const value = useContext(myContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        `${backend_URL}/user/edit`,
        userInfo,
        {
          headers: {
            Authorization: `Bearer ${value.token}`,
          },
        }
      );
      if (response.data === "User Updated") {
        toast.success("Profile Updated Successfully");
        setUserName(userInfo.newName);
        navigate(`/profile/${userInfo.newName}`);
      }
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              Edit Profile
            </h1>
            <p className="text-slate-400">Update your account information</p>
          </div>

          {/* Edit Form */}
          <div className="relative bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50 shadow-xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div>
                <label className="block text-slate-200 font-medium mb-2">New Name</label>
                <div className="relative group">
                  <input
                    type="text"
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, newName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter new name"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-2">New Email</label>
                <div className="relative group">
                  <input
                    type="email"
                    required
                    onChange={(e) =>
                      setUserInfo({ ...userInfo, newEmail: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                    placeholder="Enter new email"
                  />
                  <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 relative overflow-hidden group"
              >
                <span className="relative z-10">Update Profile</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* Security Tips */}
          <div className="mt-8">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-lg">
              <div className="flex items-center gap-4 mb-4">
                <div className="text-3xl">🔒</div>
                <div>
                  <h3 className="text-lg font-semibold text-slate-100">Security Tips</h3>
                  <p className="text-slate-400">Keep your account secure</p>
                </div>
              </div>
              <ul className="space-y-3 text-slate-400">
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Use a strong, unique password
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Enable two-factor authentication
                </li>
                <li className="flex items-center gap-2">
                  <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Regularly update your information
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
