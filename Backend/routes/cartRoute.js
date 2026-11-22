import express from "express"
import {addToCart,updateCart, getUserCart} from "../controllers/cartControllers.js"
import authUser from "../middleware/auth.js";


const cartRouter  = express.Router();  // create router and manage router.


cartRouter.post('/get', authUser, getUserCart);
cartRouter.post('/add', authUser, addToCart);
cartRouter.post('/update', authUser, updateCart);

export default cartRouter;