import mongoose from "mongoose";

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MongoDB_URI,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("connection successful to DB");
  } catch (error) {
    console.error("database connection failed");
    process.exit(0);
  }
};

export default connectDb;
