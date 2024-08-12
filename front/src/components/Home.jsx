import React, { useEffect, useState } from "react";
import Cover from "./Cover";
import axios from "axios";
axios.defaults.withCredentials = true;

const Home = ({ updateProductData }) => {
  const [productData, setProductData] = useState([]);

  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://mobilecover-mern-backend.onrender.com/product", {
          headers: {
            "Content-Type": "application/json",
          },
        });
        setProductData(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchData();
  }, [updateProductData]);

  return (
    <div className="h-full min-h-screen flex">
      <div className=" flex flex-wrap gap-5 items-start">
        {
        !productData.length ? (
          <p className="text-3xl tracking-tighter ml-[500px] mt-[200px]">Product Unavailable</p>
        ) : (
          productData.map((data, index) =>  (
              <Cover
                key={index}
                imgUrl={`https://mobilecover-mern-backend.onrender.com/images/${data.image}`}
                model={data.model}
                price={data.price}
                id={data._id}
              />
            )
          )
        )}
      </div>
    </div>
  );
};

export default Home;
