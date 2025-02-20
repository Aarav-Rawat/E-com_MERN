import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  items: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'product'
  }],
  status: {
    type: String,
    enum: ['delivered', 'processing', 'cancelled'],
    default: 'delivered'  // Changed from 'pending' to 'delivered'
  },
  orderDate: {
    type: Date,
    default: Date.now
  }
});

const orderModel = mongoose.model("Order", orderSchema);
export default orderModel;