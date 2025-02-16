import axios from "axios";
axios.defaults.withCredentials = true;
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { backend_URL } from "./config";

const Product = ({ imgUrl, model, price, id }) => {
  const addToCart = async (id) => {
    try {
      const token = JSON.parse(sessionStorage.getItem('token'));
      const response = await axios.post(
        `${backend_URL}/user/cart`,
        { productId: id },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data);
    } catch(err) {
      toast.error("Failed to add product to cart");
      console.log(err.message);
    }
  };

  return (
    <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl border border-slate-700/50 overflow-hidden hover:shadow-xl transition-all duration-300 group">
      <div className="aspect-square overflow-hidden">
        <img
          src={imgUrl}
          alt={model}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </div>
      <div className="p-6">
        <h3 className="text-lg font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
          {model}
        </h3>
        <p className="text-slate-400 mt-2">₹{price.toLocaleString()}</p>
        <button
          onClick={() => addToCart(id)}
          className="w-full mt-4 py-3 rounded-xl bg-gradient-to-r from-indigo-600/10 to-purple-600/10 text-indigo-400 font-medium hover:from-indigo-600 hover:to-purple-600 hover:text-white transition-all duration-300 border border-indigo-500/20 hover:border-transparent"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default Product;
