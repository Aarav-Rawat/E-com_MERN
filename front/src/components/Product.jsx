import React, { useState } from "react";
import axios from "axios"


const Product = ({setUpdateProductData}) => {
  const [image, setImage] = useState();
  const [model, setModel] = useState();
  const [price, setPrice] = useState("0.00");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try{
      const response = await axios.post(
        "http://localhost:3000/product/create",
        {
          image,
          model,
          price
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

     setUpdateProductData((prev)=>!prev)
    }

    catch(err){
       console.log(err.message);
    }
  };

  return (
    <div className="bg-[#E0E6EC] h-screen">
      <span>Create New Cover</span>
      <div className="productDetails">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col gap-4"
        >
          <input
            type="file"
            placeholder="Upload Image"
            name="image"
            onChange={(e) => {
              setImage(e.target.value);
            }}
            className="w-[300px] px-2 py-1 rounded-md"
          />

          <input
            type="text"
            placeholder="Model"
            name="model"
            onChange={(e) => {
              setModel(e.target.value);
            }}
            className="w-[300px] px-2 py-1 rounded-md"
          />

          <input
            type="number"
            placeholder="Price"
            name="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="w-[300px] px-2 py-1 rounded-md"
          />

          <input type="submit" className="bg-blue-500 px-2 py-1 rounded-md"/>
        </form>
      </div>
    </div>
  );
};

export default Product;
