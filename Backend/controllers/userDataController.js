import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

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
    const user = await userModel.findOne({ email: req.user.email });
    console.log(user);
    const cart = user.cart;
    await userModel.updateOne(
      { email: req.user.email },
      {
        $push: { orders: cart },
        $set: { cart: [] },
      }
    );

    await Promise.all(
      cart.map(async (id) => {
        await productModel.findOneAndUpdate({ _id: id },
           {$push: {buyers: user._id }});
      })
    );

    res.status(200).send("Order Placed");
  } catch (err) {
    res.status(500).send(err.message);
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
