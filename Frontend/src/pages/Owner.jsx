import React, { useContext, useState } from "react";
import axios from "axios";
import { backend_URL } from "../components/config";
import { toast } from "react-toastify";
import { myContext } from "../context/context";

const Owner = ({ setUpdateProductData }) => {
  const [productInfo, setProductInfo] = useState({
    model: "",
    price: "",
    image: null,
  });
  const value = useContext(myContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("model", productInfo.model);
    formData.append("price", productInfo.price);
    formData.append("image", productInfo.image);

    try {
      await axios.post(`${backend_URL}/product/create`, formData, {
        headers: {
          Authorization: `Bearer ${value.token}`,
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Product Added Successfully");
      setUpdateProductData((prev) => prev + 1);
      setProductInfo({ model: "", price: "", image: null });
      e.target.reset();
    } catch (err) {
      console.log(err.message);
      toast.error("Failed to add product");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
              Seller Dashboard
            </h1>
            <p className="text-slate-400">Add and manage your products</p>
          </div>

          {/* Add Product Form */}
          <div className="relative bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 border border-slate-700/50 shadow-xl overflow-hidden">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

            <form onSubmit={handleSubmit} className="relative space-y-6">
              <div>
                <label className="block text-slate-200 font-medium mb-2">Product Name</label>
                <input
                  type="text"
                  required
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, model: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter product name"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-2">Price (₹)</label>
                <input
                  type="number"
                  required
                  onChange={(e) =>
                    setProductInfo({ ...productInfo, price: e.target.value })
                  }
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter price"
                />
              </div>

              <div>
                <label className="block text-slate-200 font-medium mb-2">Product Image</label>
                <div className="relative">
                  <input
                    type="file"
                    required
                    onChange={(e) =>
                      setProductInfo({ ...productInfo, image: e.target.files[0] })
                    }
                    className="w-full px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-indigo-600/50 file:text-slate-200 hover:file:bg-indigo-600/70 transition-all duration-200"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 relative overflow-hidden group"
              >
                <span className="relative z-10">Add Product</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </form>
          </div>

          {/* Tips Section */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-lg">
              <div className="text-3xl mb-4">💡</div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Product Tips</h3>
              <p className="text-slate-400">Add clear, high-quality images and detailed descriptions to increase sales.</p>
            </div>
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 border border-slate-700/50 shadow-lg">
              <div className="text-3xl mb-4">📊</div>
              <h3 className="text-lg font-semibold text-slate-100 mb-2">Pricing Strategy</h3>
              <p className="text-slate-400">Research market prices and set competitive rates for better conversions.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Owner;
