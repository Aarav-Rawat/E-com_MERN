import mongoose from "mongoose";

// const connectDb = async () => {
//   try {
//       const conn = await mongoose.connect(process.env.MongoDb_Compass_URI, {
//           useNewUrlParser: true,
//           useUnifiedTopology: true,
//       });
//       console.log(`Connected to compass`);
//   } catch (err) {
//       console.error(`Not connected to compass`);
//       process.exit(1); 
//   }
// }

const connectDb = async () => {
    try {
      await mongoose.connect(process.env.MongoDb_Atlas_URI);
      console.log("connection successful to DB");
    } catch (error) {
      console.error("database connection failed",error);
      process.exit(1);
    }
  };


export default connectDb;

