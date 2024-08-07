import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  isAdmin: Boolean,
  cart: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
  orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "product" }],
});

const user = mongoose.model("user", userSchema);

export default user;
