import React, { useEffect, useState } from "react";
import axios from "axios";
import Product from "./Product";
axios.defaults.withCredentials = true;
import {backend_URL} from "./config"
const Home = ({ updateProductData }) => {
  const [productData, setProductData] = useState([]);
 
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(backend_URL + "/product");
      
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
              <Product
                key={index}
                imgUrl={backend_URL + `/images/${data.image}`}
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
