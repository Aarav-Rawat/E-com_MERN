import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { backend_URL } from "../components/config";
import { toast } from "react-toastify";
import { myContext } from "../context/context";
import { Link } from "react-router-dom";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const value = useContext(myContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error("Please login first");
          return;
        }

        const response = await axios.get(`${backend_URL}/user/cart`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        setCartItems(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Cart fetch error:", err);
        toast.error("Failed to fetch cart items");
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const placeOrder = async () => {
    try {
      const token = sessionStorage.getItem('token');
      if (!token) {
        toast.error("Please login first");
        return;
      }

      // Create order payload with just the product IDs
      const orderItems = cartItems.map(item => item._id);

      const response = await axios.post(
        `${backend_URL}/user/order`,
        { items: orderItems },
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.data.success) {
        toast.success("Order placed successfully!");
        setCartItems([]); // Clear cart after successful order
      }
    } catch (err) {
      console.error("Order placement error:", err);
      toast.error(err.response?.data?.message || "Failed to place order");
    }
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.price, 0);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      <div className="container mx-auto px-4 py-16">
        {/* Header */}
        <div className="max-w-6xl mx-auto mb-12">
          <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 mb-2">
            Your Cart
          </h1>
          <p className="text-slate-400">Review and manage your selected items</p>
        </div>

        {cartItems.length === 0 ? (
          <div className="max-w-md mx-auto">
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-3xl p-8 text-center border border-slate-700/50 shadow-xl">
              <div className="w-20 h-20 bg-slate-700/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🛒</span>
              </div>
              <h3 className="text-xl font-semibold text-slate-100 mb-2">Your cart is empty</h3>
              <p className="text-slate-400 mb-6">Start shopping to add items to your cart</p>
              <Link 
                to="/"
                className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 group"
              >
                <span>Continue Shopping</span>
                <svg className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        ) : (
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cartItems.map((item, index) => (
                <div 
                  key={index}
                  className="group bg-slate-800/50 backdrop-blur-lg rounded-2xl p-4 border border-slate-700/50 hover:border-indigo-500/50 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  <div className="flex items-center gap-6">
                    <div className="w-24 h-24 rounded-xl overflow-hidden bg-slate-700/50">
                      <img
                        src={backend_URL + `/images/${item.image}`}
                        alt={item.model}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-slate-100 group-hover:text-indigo-400 transition-colors">
                        {item.model}
                      </h3>
                      <p className="text-slate-400">₹{item.price.toLocaleString()}</p>
                    </div>
                    <button className="p-2 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-red-400 transition-colors">
                      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary */}
            <div className="bg-slate-800/50 backdrop-blur-lg rounded-2xl p-6 h-fit border border-slate-700/50 shadow-lg sticky top-24">
              <h2 className="text-xl font-semibold text-slate-100 mb-6">Order Summary</h2>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-slate-300">
                  <span>Shipping</span>
                  <span className="text-emerald-400">Free</span>
                </div>
                <div className="border-t border-slate-700 pt-4">
                  <div className="flex justify-between text-lg font-semibold">
                    <span className="text-slate-100">Total</span>
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400">
                      ₹{calculateTotal().toLocaleString()}
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={placeOrder}
                className="w-full py-4 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-medium hover:from-indigo-500 hover:to-purple-500 transition-all duration-300 shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 relative overflow-hidden group"
              >
                <span className="relative z-10">Place Order</span>
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
              <p className="text-center text-sm text-slate-400 mt-4">
                Secure checkout powered by Stripe
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
