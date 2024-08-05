import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import userRouter from "./routes/userRouter.js"
import indexRouter from "./routes/indexRouter.js"
import productRouter from "./routes/productRouter.js"
import ownerRouter from "./routes/ownerRouter.js"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express();
dotenv.config();
const port = process.env.PORT;
const MongoDB_URI = process.env.MongoDB_URI;

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
 

try {
  mongoose.connect(MongoDB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("connected to mongoDB");
} catch (err) {
  console.log("Error", err);
}

app.use("/",indexRouter);
app.use("/user",userRouter);
app.use("/product",productRouter);
app.use("/owner",ownerRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
