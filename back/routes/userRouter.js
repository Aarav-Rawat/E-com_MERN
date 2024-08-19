import express from 'express'
import {createUser,loginUser} from "../controllers/authController.js"
import { addToCart, getCart, userOrder, userProfile, updateUser} from '../controllers/userDataController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const router = express.Router();

router.post('/create',createUser);
router.post('/login',loginUser);
router.post('/cart',isLoggedIn,addToCart);
router.get('/cart',getCart);
router.get('/profile',userProfile);
router.post('/order',userOrder);
router.post('/edit',updateUser);

export default router;