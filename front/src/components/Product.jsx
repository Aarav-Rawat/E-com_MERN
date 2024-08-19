import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Product = ({imgUrl,price,model, id, btn }) => {
  const backendURL = "http://localhost:3000";
  const addToCart = async (id) => {
    try{

      const response = await axios.post(
        `${backendURL}/user/cart`,
        {
          productId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      toast.success(response.data);
    } catch(err){
      console.log(err.message);
    }
  };

  return (
    <div className="coverDetails flex flex-col items-start p-2 gap-2 w-[15vw] h-fit">
      <img src={imgUrl} alt="loading..." />

      <p className="tracking-tighter text-base">{model}</p>

      <span>{price}</span>

      {
        btn === false  ? (
         null
        ) : (
          <button
          onClick={() => addToCart(id)}
          className="bg-blue-600 px-2 py-[1px] text-white rounded-md"
        >
          Add to Cart
        </button>
        )
      }

    </div>
  );
};

export default Product;
