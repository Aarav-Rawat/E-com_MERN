import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  fullname: String,
  email: String,
  password: String,
  contact:  Number,
  isAdmin: {
    type: Boolean,
    default: false
  },
  cart: {
    type: Array,
    default: [],
  },
  orders: {
    type: Array,
    default: [],
  },
});

const user = mongoose.model("user", userSchema);

export default user;
