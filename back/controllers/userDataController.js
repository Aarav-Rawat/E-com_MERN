import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

export const addToCart = async (req, res) => {
  try {
    await userModel.findOneAndUpdate(
      { email: req.user.email },
      { $push: { cart: req.body.productId } }
    );

    res.status(200).send("Added To Cart");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getCart = async (req, res) => {
  try {
    const user = await userModel
      .findOne({ email: req.user.email })
      .populate("cart");
    res.status(200).json(user.cart);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const userProfile = async (req, res) => {
  try{
    const user = await userModel.findOne({email: req.user.email});
    res.status(200).json({
      name: user.fullname,
      email: user.email,
      // admin: user.isAdmin.
      orders: orders
    });
  }
  catch(err){
    res.status(500).send(err.message);
  }
};

export const userOrder = async(req,res) =>{
  try{

    const user = await userModel.findOne({email: req.user.email});
    const cart = user.cart;
    await userModel.updateOne({email: req.user.email},{
      $push: {orders: cart},
      $set: {cart: []}
    });

     await Promise.all(
     cart.map(async (id)=>{
        await productModel.findOneAndUpdate({_id: id},{buyer: user._id});
     })
    )

    res.status(200).send("Ordered");
  }
  catch(err){
    res.status(500).send(err.message);
  }
}
