import React, { useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Owner = ({ setUpdateProductData }) => {
  const [image, setImage] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("model", model);
    formData.append("price", price);
    try {
      const response = await axios.post(
        "https://mobilecover-mern-backend.onrender.com/product/create",
        formData,
      );

      setUpdateProductData((prev) => !prev);
      toast.success(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="bg-[#E0E6EC] h-screen flex items-center justify-center flex-col">
      <span className="text-3xl tracking-tighter mb-10">Create New Cover</span>
      <div className="productDetails">
        <form
          onSubmit={handleSubmit}
          className="flex justify-center items-center flex-col gap-4 mb-56"
        >
          <input
            type="file"
            name="image"
            onChange={(e) => {
              setImage(e.target.files[0]);
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

          <input type="submit" value="Create" className="bg-blue-500 px-2 py-1 rounded-xl" />
        </form>
      </div>
    </div>
  );
};

export default Owner;
