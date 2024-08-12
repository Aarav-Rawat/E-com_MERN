import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI);
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection failed",error);
    process.exit(1);
  }
};

export default connectDb;
