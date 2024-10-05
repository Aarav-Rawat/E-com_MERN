import express from "express"
import { createProduct,getProducts,getProduct } from "../controllers/productController.js";
const router = express.Router();
import upload from "../config/multer.js"
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.get("/",getProducts)
router.get("/getone",getProduct)
router.post("/create",isLoggedIn,upload.single('image'),createProduct)

export default router; 