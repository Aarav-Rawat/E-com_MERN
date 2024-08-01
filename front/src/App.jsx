import React, { useState } from "react";
import Signup from "./components/Signup";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Product from "./components/Product";


const App = () => {
  const [updateProductData, setUpdateProductData] = useState(0);
  return (
    <div className="">
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<Home updateProductData={updateProductData} />}
        ></Route>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/logout" element={<Logout />}></Route>
        <Route
          path="/admin"
          element={<Product setUpdateProductData={setUpdateProductData} />}
        ></Route>
      </Routes>
    </div>
  );
};

export default App;
