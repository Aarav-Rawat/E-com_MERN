import mongoose from "mongoose";

const localConnectionString = 'mongodb://localhost:27017/E-com'; 
const connectDb = ()=>{
  mongoose.connect(localConnectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to Compass');
})
.catch((err) => {
  console.error('Connection Failed', err.message);
});
}

export default connectDb;

// const connectDb = async () => {
//   try {
//     await mongoose.connect(process.env.MongoDB_URI);
//     console.log("connection successful to DB");
//   } catch (error) {
//     console.error("database connection failed",error);
//     process.exit(1);
//   }
// };