import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from "./Product";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const backendURL = "http://localhost:3000"
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(`${backendURL}/user/cart`);
        if (response.data.length > 0) {
          setCart(response.data);
        } else {
          setCart([]);
        }
      } catch (err) {
        setCart([]);
        console.log(err.message);
      }
    };

    fetchUserCart();
  }, []);

  const handleOrder = async () => {
    try {
      const response = await axios.post(`${backendURL}/user/order`,{
        headers: {
          "Content-Type": "application/json",
        },
      });
      toast.success(response.data);
    } catch (err) {
      console.log(err.message);

    }
  };

  return (
    <div className="h-full min-h-screen flex flex-col items-center py-5 gap-5">
      <div className="flex flex-wrap gap-5 ml-28">
        {cart.length > 0 ? (
          cart.map((data, index) => (
            <Product
              key={index}
              imgUrl={`${backendURL}/images/${data.image}`}
              model={data.model}
              price={data.price}
              btn={false}
            />
          ))
        ) : (
          <div className="text-3xl tracking-tighter mr-[100px] mt-[150px]">
            No Product Added
          </div>
        )}
      </div>
      {cart.length > 0 ? (
        <button
          className="bg-zinc-800 px-2 py-[1px] text-white rounded-md"
          onClick={handleOrder}
        >
          Place Order
        </button>
      ) : null}
    </div>
  );
};

export default Cart;
