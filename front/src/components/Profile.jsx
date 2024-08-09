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
    <div className="p-2 h-screen bg-[#E0E6EC] text-xl">
      <div className="mt-10 ml-10">
        <div className="flex gap-3">
          Name:
          <span>
          {userData.name}
          </span>
        </div>
        <div className="flex gap-3">
          Email:
          <span>
          {userData.email}
          </span>
        </div>
        <div className="">Admin: <span>{userData.admin ? "Yes" : "No"}</span></div>
        <div>
        <span>Your Orders:</span>
        {
          userData.orders((data,index)=>(
            <Cover key={index} btn={false} imgUrl={`http://localhost:3000/images/${data.image}`} price={data.price} model={data.model}/>
          ))
        }
        </div>
      </div>
    </div>
  );
};

export default Profile;
