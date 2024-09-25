import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrders ,verifyOrder } from "../controllers/orderControllers.js";
 

const orderRouter = express.Router();

orderRouter.post("/place", authMiddleware, placeOrders);
orderRouter.post("/verify",  verifyOrder);


export default orderRouter;
