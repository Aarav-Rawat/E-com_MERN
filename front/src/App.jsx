import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile";
import Owner from "./components/Owner"


const App = () => {
  const [updateProductData, setUpdateProductData] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  return (
    <div className="tracking-tighter">
      <Navbar isAuthenticated={isAuthenticated} />
      <Routes>
        <Route
          path="/"
          element={<Home updateProductData={updateProductData} />}
        ></Route>
        <Route
          path="/signup"
          element={<Signup setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
        <Route
          path="/login"
          element={<Login setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
        <Route
          path="/logout"
          element={<Logout setIsAuthenticated={setIsAuthenticated} />}
        ></Route>
        <Route
          path="/owner"
          element={<Owner setUpdateProductData={setUpdateProductData} />}
        ></Route>
        <Route path="/profile" element={<Profile />}></Route>
      </Routes>
    </div>
  );
};

export default App;
