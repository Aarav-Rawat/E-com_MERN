import React, { useState } from "react";
import { Link } from "react-router-dom";

const navbar = () => {

  return (
    <div className=" flex justify-between items-center px-5 h-[8vh] text-xl tracking-tighter ">
      <div>
        <img src="" alt="" />
        <span className="text-2xl">KIRMADA®</span>
      </div>

      <div className="flex space-x-4">
        <Link to="/">Home</Link>
        <Link to="/login" >Login</Link>
        <Link to="/logout" >Logout</Link>
        <Link to="/signup">Signup</Link>
        <Link to="/admin">Admin</Link>
      </div>

      {/* <div>
        <input type="search" placeholder="Search Your Favourate Cover..." className="outline-none placeholder:text-lg rounded-md pl-2"/>
      </div> */}
    </div>
  );
};

export default navbar;
