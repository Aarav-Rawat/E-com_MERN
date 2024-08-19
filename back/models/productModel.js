import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  image: String,
  model: String,
  price: Number,
  buyer: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
  owner: [{ type: mongoose.Schema.Types.ObjectId, ref: "user" }],
});

const product = mongoose.model("product", productSchema);

export default product;
