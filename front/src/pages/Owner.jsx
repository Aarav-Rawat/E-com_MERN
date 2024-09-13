import React, { useContext, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { backend_URL } from "../components/config";
import { myContext } from "../context/context";

const Owner = ({ setUpdateProductData }) => {
  const [image, setImage] = useState("");
  const [model, setModel] = useState("");
  const [price, setPrice] = useState("");
  const value = useContext(myContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", image);
    formData.append("model", model);
    formData.append("price", price);
    try {
      const response = await axios.post(
        backend_URL + "/product/create",
        formData,
        {
          headers: {
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
          },
        }
      );

      setUpdateProductData((prev) => !prev);
      if (response.data === "login first") {
        toast.error(response.data);
      } else {
        toast.success(response.data);
      }
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className=" h-screen flex items-center justify-center flex-col text-black">
      <span className="text-3xl tracking-tighter mb-10 text-white">
        create new{" "}
        <span className="text-[#3576DF] font-semibold text-[35px]">
          Product
        </span>
      </span>
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
            className="w-[300px] px-2 py-1 rounded-md text-white"
          />

          <input
            type="text"
            placeholder="Model"
            name="model"
            onChange={(e) => {
              setModel(e.target.value);
            }}
            className="w-[300px] px-2 py-1 rounded-md outline-none"
          />

          <input
            type="number"
            placeholder="Price"
            name="price"
            onChange={(e) => {
              setPrice(e.target.value);
            }}
            className="w-[300px] px-2 py-1 rounded-md outline-none"
          />

          <input
            type="submit"
            value="Create"
            className="bg-blue-500 px-2 py-1 rounded-xl "
          />
        </form>
      </div>
    </div>
  );
};

export default Owner;
