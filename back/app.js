import express from "express";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js"
import indexRouter from "./routes/indexRouter.js"
import productRouter from "./routes/productRouter.js"
import cors from "cors"
import cookieParser from "cookie-parser"
import connectDb from "./config/mongoDB.js"


const app = express();
dotenv.config();
const port = process.env.PORT || 3000;
connectDb();

app.use(express.json());
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
  origin: process.env.FrontEnd_URL,
  credentials: true,
}));

app.use("/",indexRouter);
app.use("/user",userRouter);
app.use("/product",productRouter);

app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});
