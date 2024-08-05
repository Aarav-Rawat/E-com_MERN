import React, { useState } from "react";
import { Link } from "react-router-dom";

const navbar = ({ isAuthenticated }) => {
  return (
    <div className=" flex justify-between items-center px-5 h-[8vh] text-xl tracking-tighter ">
      <div>
        <img src="" alt="" />
        <span className="text-2xl">KIRMADA</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        {isAuthenticated ? (
          <Link to="/logout">Logout</Link>
        ) : (
          <Link to="/signup">Signup</Link>
        )}
        <Link to="/Owner">Owner</Link>
        <Link to="/profile">Profile</Link>
      </div>

     
    </div>
  );
};

export default navbar;
