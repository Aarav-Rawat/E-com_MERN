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
    <div className="Home h-screen flex bg-[#E0E6EC]">
      <div className="coverContainer bg-2 flex flex-wrap gap-5 ml-20 mt-10`">
        {!productData.length ? (
          <p className="text-3xl tracking-tighter ml-[430px] mt-[100px]">No Product Added</p>
        ) : (
          productData.map((data, index) => {
            const base64Image = `data:image/jpeg;base64,${data.image}`;
            return (
              <Cover
                key={index}
                imgUrl={base64Image}
                model={data.model}
                price={data.price}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default Home;
