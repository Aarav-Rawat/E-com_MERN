import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();


const connectDb = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/E-Com", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

// const connectDb = async () => {
//     try {
//       await mongoose.connect(process.env.MongoDb_Atlas_URI);
//       console.log("connection successful to DB");
//     } catch (error) {
//       console.error("database connection failed",error);
//       process.exit(1);
//     }
//   };

export default connectDb;

