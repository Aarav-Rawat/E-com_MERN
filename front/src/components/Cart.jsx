import React, { useEffect, useState } from "react";
import axios from "axios";
import Cover from "./Cover";
axios.defaults.withCredentials = true;

const Cart = () => {
  const [cart, setCart] = useState([]);
  useEffect(() => {
    const fetchUserCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/user/cart");
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

  return (
    <div className="h-full min-h-screen flex ">
      <div className="flex flex-wrap gap-5">
        {cart.length > 0 ? (
          cart.map((data, index) => (
            <Cover
              key={index}
              imgUrl={`http://localhost:3000/images/${data.image}`}
              model={data.model}
              price={data.price}
              btn={false}
            />
          ))
        ) : (
          <div className="text-3xl tracking-tighter ml-[500px] mt-[200px]">
            No Cover Added
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
