import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Product from "./Product"
axios.defaults.withCredentials = true;

const Profile = () => {
  const [userData, setUserData] = useState([]);
  const backendURL = "http://localhost:3000";
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(`${backendURL}/user/profile`);

        setUserData(response.data);
        console.log(response.data)
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-2 min-h-screen text-xl">
      <div className=" ml-10">
    
        <div className="flex gap-3">
          Name:
          <span>{userData.name}</span>
        </div>
        <div className="flex gap-3">
          Email:
          <span>{userData.email}</span>
        </div>
        <div>
          <span>Your Orders:</span>
          <div className="flex flex-wrap gap-5 items-start">
          {userData.orders && userData.orders.length > 0 ? (
            userData.orders.map((data, index) => (
              <Product
                key={index}
                btn={false}
                imgUrl={`${backendURL}/images/${data.image}`}
                price={data.price}
                model={data.model}
              />
            ))
          ) : (
            <p className="text-3xl tracking-tighter ml-[500px] mt-[100px]">No Orders Yet</p>
          )}
          </div>
          
        </div>
        <div className="ml-[45%] mt-[10%]">
        <Link to="/edit" state={{userData}} className="bg-blue-600 px-2 py-[1px] text-white rounded-md ">Edit</Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
