import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import productModel from "../models/productModel.js";

export const addToCart = async (req, res) => {
  try {
    console.log(req.user);
    const user = await userModel.findOneAndUpdate(
      { email: req.user.email },
      { $push: { cart: req.body.productId } }
    );
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }

    res.status(200).send("Added To Cart");
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).send(err.message);
  }
};

export const getCart = async (req, res) => {
  try {
    console.log("User from token:", req.user); // Debug log
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json(user.cart);
  } catch (err) {
    console.error("Get cart error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching cart items"
    });
  }
};

export const userProfile = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("orders")
      .populate("cart");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    res.status(200).json({
      success: true,
      data: {
        name: user.fullname,
        email: user.email,
        orders: user.orders || [],
        cart: user.cart || []
      }
    });
  } catch (err) {
    console.error("Profile error:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching profile data"
    });
  }
};

export const userOrder = async (req, res) => {
  try {
    const { items } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "No items in order"
      });
    }

    // Create new order with 'delivered' status
    const newOrder = new orderModel({
      user: req.user._id,
      items: items,
      status: 'delivered'  // Explicitly set status to 'delivered'
    });

    await newOrder.save();

    // Clear user's cart
    await userModel.findByIdAndUpdate(req.user._id, {
      $set: { cart: [] }
    });

    res.status(200).json({
      success: true,
      message: "Order placed successfully",
      orderId: newOrder._id
    });

  } catch (err) {
    console.error("Order creation error:", err);
    res.status(500).json({
      success: false,
      message: "Error creating order: " + err.message
    });
  }
};

export const updateUser = async (req, res) => {
  try{
     const {newName , newEmail} = req.body;
     console.log(req.body);
     console.log(req.user);
   const user = await userModel.findOneAndUpdate(
    {email: req.user.email},
      {$set:{fullname: newName, email: newEmail}},
      { new: true }
    )
     console.log(user);
    res.status(200).send("User Updated");
  }
  catch(err){
    res.status(500).send(err.message);
  }
    
   
};

export const getOrderHistory = async (req, res) => {
  try {
    console.log("Getting orders for user:", req.user); // Debug log

    // Find user first
    const user = await userModel.findOne({ email: req.user.email });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // Find orders for user with populated items
    const orders = await orderModel
      .find({ user: user._id })
      .populate({
        path: 'items',
        model: 'product',
        select: 'model price image'
      })
      .sort({ orderDate: -1 });

    console.log("Found orders:", orders); // Debug log

    return res.status(200).json({
      success: true,
      orders: orders
    });

  } catch (err) {
    console.error("Order history error:", err);
    return res.status(500).json({
      success: false,
      message: "Error fetching order history: " + err.message
    });
  }
};
