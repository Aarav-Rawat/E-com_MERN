import React, { useEffect, useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Owner from "./components/Owner"
import Cart from "./components/Cart";
import axios from "axios";
axios.defaults.withCredentials = true;


const App = () => {

  const [updateProductData, setUpdateProductData] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  
  return (
    <div className="tracking-tighter">
      <Navbar isAuthenticated={isAuthenticated} setIsAuthenticated={setIsAuthenticated} setUserName={setUserName} userName={userName}/>
      <Routes>
        <Route
          path="/"
          element={<Home updateProductData={updateProductData} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} setUserName={setUserName}/>}
        ></Route>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} setUserName={setUserName}/>}
        ></Route>
        <Route
          path="/owner"
          element={<Owner setUpdateProductData={setUpdateProductData} />}
        ></Route>
        <Route path="/profile/:username" element={<Profile setUserName={setUserName}/>}></Route>
        <Route path="/cart" element={<Cart />}></Route>
      </Routes>
    </div>
  );
};

export default App;
