import express from "express"
import { createProduct,getProduct } from "../controllers/productController.js";
const router = express.Router();
import upload from "../middlewares/multer.js"
import { isLoggedIn } from "../middlewares/isLoggedIn.js";

router.get("/",getProduct)
router.post("/create",upload.single('image'),createProduct)

export default router;