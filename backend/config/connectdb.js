 import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://panchalsatyawan:satyawanji@cluster0.cft16.mongodb.net/food-satyawan")
    .then(()=>{
        console.log('database connected with database name food-satyawan ');
        
    })
 }