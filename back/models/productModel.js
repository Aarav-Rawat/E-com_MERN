import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  image: Buffer,
  model: String,
  price: Number,
});

const product = mongoose.model("product", productSchema);

export default product;
