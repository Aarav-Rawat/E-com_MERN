import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Admin from "./components/Admin";


const App = () => {
  const [updateProductData, setUpdateProductData] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="">
      <Navbar isAuthenticated={isAuthenticated}/>
      <Routes>
        <Route
          path="/"
          element={<Home updateProductData={updateProductData} />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login setIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route path="/logout" element={<Logout etIsAuthenticated={setIsAuthenticated}/>}></Route>
        <Route
          path="/admin"
          element={<Admin setUpdateProductData={setUpdateProductData} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
