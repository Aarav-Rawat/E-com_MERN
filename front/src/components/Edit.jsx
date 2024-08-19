import axios from 'axios';
import React, { useState } from 'react'
import { useLocation } from "react-router-dom";
axios.defaults.withCredentials = true;

const Edit = () => {
  const location = useLocation();
  const { userData } = location.state || {};
  const backendURL = "http://localhost:3000";
  const [newUserData, setnewUserData] = useState()

const handleEdit = ()=>{
   const response = axios.post(backendURL + "/user/edit",
    {
        
    }
    ,{
    headers:{
      "Content-Type": "application/json"
    }
   })
}

  return (
    <div className="p-2 min-h-screen text-xl bg-[#E0E6EC] ">
    <div className="mt-10 ml-10 flex gap-10">
    <div className="flex gap-3">
      Name:
      <input type="text" placeholder={userData.name} className='outline-none border-none rounded-md px-2'/>
      
    </div>
    <div className="flex gap-3">
      Email:
      <input type="email" placeholder={userData.email} className='outline-none border-none rounded-md px-2'/>
    </div>
    </div>
    <button onClick={handleEdit} className='bg-blue-600 px-2 py-[1px] text-white rounded-md ml-[30%] mt-10'>Edit</button>
    </div>
  )
}

export default Edit