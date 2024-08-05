import React from "react";

const Cover = ({ imgUrl, price, model }) => {
  return (
    <div className="coverDetails flex flex-col items-start p-2 gap-2 w-[15vw] ml-10 mt-5 h-fit">
      <img src={imgUrl} alt="loading..." />

      <p className="tracking-tighter text-base">{model}</p>

      <span>{price}</span>

      <button className="bg-zinc-800 px-2 py-[1px] text-white rounded-md"> Add to Cart</button>

    </div>
  );
};

export default Cover;
