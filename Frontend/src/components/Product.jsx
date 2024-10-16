
import axios from "axios";
axios.defaults.withCredentials = true;
import {  toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backend_URL } from "./config";

const Product = ({imgUrl,price,model, id, btn }) => {


  const addToCart = async (id) => {
    console.log(id)
    try{
      const response = await axios.post(
        backend_URL +"/user/cart",
        {
          productId: id,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(sessionStorage.getItem('token'))}`,
          },
        }
      );
      toast.success(response.data);
    } catch(err){
      console.log(err.message);
    }
  };

  return (
    <div className="coverDetails flex flex-col items-start p-2 gap-2 sm:w-[15vw] h-fit text-black">
      <img src={imgUrl} alt="loading..." />

      <p className="tracking-tighter text-base">{model}</p>

      <span>{price}</span>

      {
        btn === false  ? (
         null
        ) : (
          <button
          onClick={() => addToCart(id)}
          className="bg-blue-600 px-2 py-[1px] rounded-md text-white"
        >
          Add to Cart
        </button>
        )
      }

    </div>
  );
};

export default Product;
