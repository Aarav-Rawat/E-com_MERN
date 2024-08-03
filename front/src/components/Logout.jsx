import React, { useEffect, useState } from "react";
import Login from "./Login"
import axios from "axios";

const Logout = () => {
  const [msg, setMsg] = useState();

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(response.data);
        setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  logout();

  return (
    <>
    <Login/>
    </>
  );
};

export default Logout;
