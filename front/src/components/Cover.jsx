import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;

const Cover = ({imgUrl,price,model, id, btn }) => {
  const addToCart = async (id) => {
    const response = await axios.post(
      "http://localhost:3000/user/cart",
      {
        productId: id,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
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
          className="bg-zinc-800 px-2 py-[1px] text-white rounded-md"
        >
          Add to Cart
        </button>
        )
      }

    </div>
  );
};

export default Cover;
