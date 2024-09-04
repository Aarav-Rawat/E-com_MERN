import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import axios from "axios";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Owner from "./pages/Owner";
import Profile from "./pages/Profile";
import Cart from "./pages/Cart";
import Edit from "./pages/Edit";
import Home from "./pages/Home";
import Navbar from "./components/Navbar"
axios.defaults.withCredentials = true;

const App = () => {
  const [updateProductData, setUpdateProductData] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [isSeller, setIsSeller] = useState(false);

  return (
    <div className="tracking-tighter">
      <Navbar
        isAuthenticated={isAuthenticated}
        setIsAuthenticated={setIsAuthenticated}
        setUserName={setUserName}
        userName={userName}
        isSeller={isSeller}
        setIsSeller={setIsSeller}
      />
      <Routes>
        <Route
          path="/"
          element={<Home updateProductData={updateProductData} />}
        ></Route>
        <Route
          path="/signup"
          element={
            <Signup
              setIsAuthenticated={setIsAuthenticated}
              setUserName={setUserName}
              setIsSeller={setIsSeller}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login
              setIsAuthenticated={setIsAuthenticated}
              setUserName={setUserName}
              setIsSeller={setIsSeller}
            />
          }
        ></Route>
        <Route
          path="/owner"
          element={<Owner setUpdateProductData={setUpdateProductData} />}
        ></Route>
        <Route
          path="/profile/:username"
          element={<Profile />}
        ></Route>
        <Route path="/cart" element={<Cart />}></Route>
        <Route path="/edit" element={<Edit setUserName={setUserName} />}></Route>
      </Routes>
    </div>
  );
};

export default App;
