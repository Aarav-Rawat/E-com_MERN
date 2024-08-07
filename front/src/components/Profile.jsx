import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Profile = () => {
  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/profile");

        setUserData(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-2 h-screen bg-[#E0E6EC]">
      <div>
        Name:
        {userData.name}
      </div>
      <div>
        Email:
        {userData.email}
      </div>
      <div>Admin:{userData.admin ? "Yes" : "No"}</div>
    </div>
  );
};

export default Profile;
