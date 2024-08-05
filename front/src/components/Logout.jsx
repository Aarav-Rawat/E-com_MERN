import React, { useEffect, useState } from "react";
import Login from "./Login"
import axios from "axios";
import Signup from "./Signup";

const Logout = ({setIsAuthenticated}) => {
  const [msg, setMsg] = useState();

  const logout = async () => {
    try {
      const response = await axios.get("http://localhost:3000/logout", {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
        setIsAuthenticated(false);
    } catch (error) {
      console.log(error.message);
    }
  };

  logout();

  return (
    <>
    </>
  );
};

export default Logout;
