import mongoose from "mongoose";

const productSchema = mongoose.Schema({
  image:{
    type: Buffer,
    require: true
  },
  model: {
    type: String,
    require: true
  },
  price:{
    type: Number,
    require: true
  }

    
})

const product = mongoose.model("product",productSchema);

export default product;