import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Product from "./Product";
import {backend_URL} from "./config"

const Cart = () => {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(backend_URL + "/user/cart");
       
          setCart(response.data);
       
      } catch (err) {
        
        console.log(err.message);
      }
    };

    fetchUserCart();
  }, []);

  const handleOrder = async () => {
    try {
      const response = await axios.post(backend_URL + "/user/order",{
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
        {Array.isArray(cart) && cart.length > 0 ? (
          cart.map((data, index) => (
            <Product
              key={index}
              imgUrl={backend_URL + "/images/${data.image}"}
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
      {Array.isArray(cart) && cart.length > 0 ? (
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
