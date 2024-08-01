import express from 'express'
import { logoutUser } from "../controllers/authController.js"
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const router = express.Router();

router.get("/logout",logoutUser);

export default router;