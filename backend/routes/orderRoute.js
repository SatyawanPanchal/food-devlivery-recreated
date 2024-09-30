import express from "express";
import authMiddleware from "../middleware/auth.js";
import { placeOrders ,verifyOrder,userOrders,listOrders } from "../controllers/orderControllers.js";
 

const orderRouter = express.Router();
// controllers for placing order and verifying orders from frontend
orderRouter.post("/place", authMiddleware, placeOrders);
orderRouter.post("/verify",  verifyOrder);

// controllers for food orders from admin panel

orderRouter.post('/userorders',authMiddleware,userOrders);
orderRouter.get("/list",listOrders);
//orderRouter.post('/status',updateStatus);



export default orderRouter;
