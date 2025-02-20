import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { backend_URL } from "../components/config";
import { useNavigate } from "react-router-dom";

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = sessionStorage.getItem('token');
        if (!token) {
          toast.error("Please login first");
          navigate('/login');
          return;
        }

        const response = await axios.get(`${backend_URL}/user/orders`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("Order response:", response.data); // Debug log

        if (response.data.success) {
          setOrders(response.data.orders);
        } else {
          setError(response.data.message);
          toast.error(response.data.message);
        }
      } catch (err) {
        console.error("Order history fetch error:", err);
        const errorMessage = err.response?.data?.message || "Failed to fetch order history";
        setError(errorMessage);
        toast.error(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered':
        return 'bg-green-500/10 text-green-400';
      case 'processing':
        return 'bg-yellow-500/10 text-yellow-400';
      case 'cancelled':
        return 'bg-red-500/10 text-red-400';
      default:
        return 'bg-slate-500/10 text-slate-400';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">Order History</h1>
        {orders.length === 0 ? (
          <div className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-8 text-center">
            <p className="text-slate-400">No orders found</p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div 
                key={order._id}
                className="bg-slate-800/50 backdrop-blur-lg rounded-xl p-6"
              >
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-slate-400">
                      Order ID: <span className="text-slate-200">{order._id}</span>
                    </p>
                    <p className="text-slate-400">
                      Date: {new Date(order.orderDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                    {order.status === 'delivered' ? 'Delivered' : 
                     order.status === 'processing' ? 'Processing' : 
                     order.status === 'cancelled' ? 'Cancelled' : 
                     order.status}
                  </span>
                </div>
                <div className="divide-y divide-slate-700/50">
                  {order.items.map((item) => (
                    <div key={item._id} className="py-4 flex items-center space-x-4">
                      <img 
                        src={`${backend_URL}/images/${item.image}`}
                        alt={item.model}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div>
                        <h3 className="text-white font-medium">{item.model}</h3>
                        <p className="text-slate-400">₹{item.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderHistory;