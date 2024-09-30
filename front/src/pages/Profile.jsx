import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { backend_URL } from "../components/config";
import Product from "../components/Product";
import { myContext } from "../context/context";
axios.defaults.withCredentials = true;

const Profile = () => {
 
  const token = JSON.parse(sessionStorage.getItem('token'));


  const [userData, setUserData] = useState([]);
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get(backend_URL + "/user/profile", {
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
            
          },
        });

        setUserData(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="p-2 min-h-screen text-xl text-black">
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
                  imgUrl={`${backend_URL}/images/${data.image}`}
                  price={data.price}
                  model={data.model}
                />
              ))
            ) : (
              <p className="text-3xl tracking-tighter ml-[500px] mt-[100px]">
                No Orders Yet
              </p>
            )}
          </div>
        </div>
        <div className="ml-[45%] mt-[10%]">
          <Link
            to="/edit"
            state={{ userData }}
            className="bg-blue-600 px-4 py-[1px] text-white rounded-md tracking-normal"
          >
            Edit
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Profile;
