import React from "react";

const Cover = ({ imgUrl, price, model }) => {
  return (
    <div className="coverDetails flex flex-col justify-start p-2 items-center w-[15vw] border-2 border-black">
      <img src={imgUrl} alt="loading..." />

      <p className="tracking-tighter text-base">{model} Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis, ducimus.</p>

      <span>{price}</span>

      <button className="bg-zinc-800 px-2 py-[1px] text-white rounded-md"> Add to Cart</button>

    </div>
  );
};

export default Cover;
