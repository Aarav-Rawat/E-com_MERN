import React, { useEffect, useState } from "react";
import axios from "axios";
axios.defaults.withCredentials = true;
import { backend_URL } from "../components/config";
import Product from "../components/Product";

const Home = ({ updateProductData }) => {
  const [productData, setProductData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${backend_URL}/product`);
        if (Array.isArray(response.data)) {
          setProductData(response.data);
        } else {
          setProductData([]);
          console.error("Expected array but got:", typeof response.data);
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [updateProductData]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-red-600 text-xl">Error loading products: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-b from-blue-600 to-blue-800">
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"></div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Welcome to <span className="text-blue-300">Verzatile</span>
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 mb-8">
              Discover premium products for your lifestyle
            </p>
            <button className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-300">
              Explore Collection
            </button>
          </div>
        </div>
      </div>

      {/* Products Section */}
      <div className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-slate-100 mb-8">Featured Products</h2>
        
        {!productData.length ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center bg-slate-800/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700">
              <div className="text-5xl mb-4">🛍️</div>
              <p className="text-xl text-slate-300 mb-2">No products available</p>
              <p className="text-slate-400">Our collection is being updated. Check back soon!</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {productData.map((data, index) => (
              <div key={index} className="group">
                <div className="bg-slate-800 rounded-xl overflow-hidden hover:shadow-xl hover:shadow-blue-500/10 transition-all duration-300 transform hover:-translate-y-1">
                  <Product
                    imgUrl={backend_URL + `/images/${data.image}`}
                    model={data.model}
                    price={data.price}
                    id={data._id}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Features Section */}
      <div className="bg-slate-800/50 py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: "🚀",
                title: "Fast Delivery",
                desc: "Free shipping on orders over ₹500"
              },
              {
                icon: "⭐",
                title: "Premium Quality",
                desc: "100% satisfaction guaranteed"
              },
              {
                icon: "🔒",
                title: "Secure Payments",
                desc: "Multiple payment options available"
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="bg-slate-900/50 backdrop-blur-sm p-8 rounded-2xl border border-slate-700/50 hover:border-blue-500/50 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-semibold mb-3 text-slate-100">{feature.title}</h3>
                <p className="text-slate-400 leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-2xl mx-auto text-center">
          <h3 className="text-3xl font-bold text-slate-100 mb-4">Stay Updated</h3>
          <p className="text-slate-400 mb-8">
            Subscribe to our newsletter for exclusive offers and updates
          </p>
          <div className="flex gap-3 max-w-md mx-auto">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="flex-1 px-4 py-3 rounded-lg bg-slate-800 border border-slate-700 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
