
import express from 'express'
import { addToCart ,removeFromCart , getItemsFromCart } from '../controllers/cartController.js';

const cartRouter = express.Router();

cartRouter.post('/add',addToCart);
cartRouter.post("/remove",removeFromCart);
cartRouter.post("/get",getItemsFromCart);


export default cartRouter;    
