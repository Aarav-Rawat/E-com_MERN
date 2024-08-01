import React, { useEffect, useState } from "react";
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
      setMsg(response.data);
    } catch (error) {
      setMsg(error.message);
    }
  };

  logout();

  return <div>{msg}</div>;
};

export default Logout;
