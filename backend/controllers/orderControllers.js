import Stripe from "stripe";
import "dotenv/config";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import { urlencoded } from "express";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// what we all need to do in placeOrders
// 1. Give the frontend url
// 2. create the newOrder from the orderModel containing userId , items,amount,address
//     and initialize all these values from req object in
// 3. save the new order
// 4. clear all orders before placeing the newOrder
// 5. make setup for the stripe
//     a.map from the items ordered and set price_data containing currency ,product_data,name
// 6. append a new row to this containing the delivery charges
// 7. create the checkout session for stripe
// 8. send the response as the session_url

const placeOrders = async (req, res) => {
  // what we all need to do in placeOrders
  // 1. Give the frontend url
  const frontend_url = "http://localhost:5173";

  console.log("stripe key ===>", process.env.STRIPE_SECRET_KEY);

  // 2. create the newOrder from the orderModel containing userId , items,amount,address

  //     and initialize all these values from req object in new order

  // console.log('data recieved from client in ordercontrollers.js =',req.body);

  try {
    const newOrder = new orderModel({
      userId: req.body.userId,
      Items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
    });

    // 3. save the new order
    const datasaved = await newOrder.save();

    //  console.log('data saved in order =====>', datasaved);

    // 4. clear all orders before placeing the newOrder
    //------------------------------------
    //await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    // 5. make setup for the stripe
    //     a.map from the items ordered and set price_data containing currency ,product_data,name
    const line_items = req.body.items.map((item) => ({
      price_data: {
        currency: "inr",
        product_data: {
          name: item.name,
        },
        unit_amount: item.price * 80 * 100,
      },
      quantity: 1,
    }));

    // 6. append a new row to this containing the delivery charges
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: { name: "Delivery Charges" },
        unit_amount: 2 * 100 * 80,
      },
      quantity: 1,
    });

    // 7. create the checkout session for stripe
    const session = await stripe.checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    console.log("session of stripe payment--->  ", session);

    res.json({
      success: true,
      session_url: session.url,
    });

    // 8. send the response as the session_url
  } catch (error) {
    console.log(
      "error",
      error.message + " error in payment section in placeorder.js at backend"
    );

    res.json({
      success: false,
      message: error.message + " error in payment section in placeo",
    });
  }
};

// user order for the frontend

const userOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log("error in user orders", error.message);
    res.json({
      success: false,
      message: "error in user orders" + error.message,
    });
  }
};

const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  console.log("i am in verify order");
  try {
    if (success) {
      const response = await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
      });
      if (response) {
        res.json({
          success: true,
          message: "paid",
        });
      } else {
        const response = await orderModel.findByIdAndDelete(orderId);
        res.json({
          success: false,
          message: "not paid",
        });
      }
    }
  } catch (error) {
    console.log("error in payment ===>", error.message);
    res.json({
      success: false,
      message: error.message + "is the message",
    });
  }
};

const listOrders=async(req,res)=>{
try {
  const orders=await orderModel.find({});
  res.json({success:true,data:orders})
} catch (error) {
  console.log('error==>',error.message);
  res.json({
    success:false,
    message: error.message + "error in listing the order"
  })
  
}
}

export { placeOrders, verifyOrder, userOrders,listOrders };
