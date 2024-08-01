import React, { useEffect, useState } from "react";
import Cover from "./Cover";
import axios from "axios";

const Home = ({ updateProductData }) => {
   
  const [productData, setProductData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3000/product", {
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

  console.log(productData);
  return (
    <div className="Home h-screen flex mt-10">
      <div className="coverContainer bg-2 flex flex-wrap gap-5 ml-20">
        {!productData.length ? (
          <p>No Product Added</p>
        ) : (
          productData.map((data, index) => (
            <Cover
              key={index}
              imgUrl={data.image.data}
              model={data.model}
              price={data.price}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
