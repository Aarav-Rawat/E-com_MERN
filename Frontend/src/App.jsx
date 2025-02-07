import React, { useState, useEffect } from "react";
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
import { myContext } from "./context/context";
import { backend_URL } from './components/config';

// Set default axios configurations
axios.defaults.baseURL = backend_URL;
axios.defaults.withCredentials = true;
axios.defaults.headers.common['Content-Type'] = 'application/json';

// Add axios interceptor for debugging
axios.interceptors.request.use(request => {
  console.log('Starting Request:', request);
  return request;
});

axios.interceptors.response.use(
  response => {
    console.log('Response:', response);
    return response;
  },
  error => {
    console.error('Request Error:', error);
    return Promise.reject(error);
  }
);

const App = () => {
  const [updateProductData, setUpdateProductData] = useState(0);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [token, setToken] = useState(sessionStorage.getItem('token') || null);

  useEffect(() => {
    // Check for existing session
    const storedToken = sessionStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
      setIsAuthenticated(true);
      // You might want to validate the token here
    }
  }, []);

  const handleSetToken = (newToken) => {
    setToken(newToken);
    if (newToken) {
      sessionStorage.setItem('token', newToken);
    } else {
      sessionStorage.removeItem('token');
    }
  };

  return (
    <myContext.Provider value={{ token, setToken: handleSetToken }}>
    <div className="tracking-tighter bg-[#E0E6EC]">
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
    </myContext.Provider>
  );
};

export default App;
