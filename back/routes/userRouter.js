import express from 'express'
import {createUser,loginUser} from "../controllers/authController.js"
import { addToCart, getCart, userOrder, userProfile, updateUser} from '../controllers/userDataController.js';
import { isLoggedIn } from '../middlewares/isLoggedIn.js';
const router = express.Router();

router.post('/create',createUser);
router.post('/login',loginUser);
router.post('/cart',isLoggedIn,addToCart);
router.get('/cart',isLoggedIn,getCart);
router.get('/profile',isLoggedIn,userProfile);
router.post('/order',isLoggedIn,userOrder);
router.post('/edit',isLoggedIn,updateUser);

export default router;