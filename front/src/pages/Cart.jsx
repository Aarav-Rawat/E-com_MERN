import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {backend_URL} from "../components/config"
import Product from "../components/Product";

const Cart = () => {
  const [cart, setCart] = useState([]);
  
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get(backend_URL + "/user/cart",{
          headers: {
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
          },
        });
       
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
          Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
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
              imgUrl={backend_URL + `/images/${data.image}`}
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
          className="bg-[#3576DF] px-2 py-[1px] text-white rounded-md"
          onClick={handleOrder}
        >
          Place Order
        </button>
      ) : null}
    </div>
  );
};

export default Cart;
