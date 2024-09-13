import axios from "axios";
import React, { useContext, useState } from "react";
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
axios.defaults.withCredentials = true;
import {backend_URL} from "../components/config"
import { myContext } from "../context/context";

const Edit = ({setUserName}) => {
  const location = useLocation();
  const { userData } = location.state || {};
 
 const [newUserData, setNewUserData] = useState({
   name: userData.name,
   email: userData.email
 })

  
  const handleChange = (e)=>{
       const {name,value} = e.target;
       setNewUserData({
        ...newUserData,
        [name]: value
       })

  }

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      
      const response = await axios.post(
        backend_URL + "/user/edit",
        {
          newName: newUserData.name,
          newEmail: newUserData.email
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
          },
        }
      );
      if(response.data==="User Updated"){
        toast.success(response.data);
        setUserName(newUserData.name)
      }
      else
      toast.error(response.data);

    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="p-2 min-h-screen text-xl ">
      <div className="mt-10 ml-10 flex gap-10">
        <div className="flex gap-3">
          Name:
          <input
            type="text"
            placeholder={userData.name}
            className="outline-none border-none rounded-md px-2 text-black  text-lg"
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="flex gap-3">
          Email:
          <input
            type="email"
            placeholder={userData.email}
            className="outline-none border-none rounded-md px-2 text-black  text-lg"
            onChange={handleChange}
            name="email"
          />
        </div>
      </div>
      <button
        onClick={handleEdit}
        className="bg-blue-600 px-2 py-[1px] text-white rounded-md ml-[50%] mt-10"
      >
        Update
      </button>
    </div>
  );
};

export default Edit;
