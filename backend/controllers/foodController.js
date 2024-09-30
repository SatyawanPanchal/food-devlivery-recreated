import foodModel from "../models/foodModel.js";
import fs from 'fs'

const addFood = async (req, res) => {
  let image_filename = `${req.file.filename}`;
  console.log("requested file in add at admin end.......", req.file, req.body);

  const food = new foodModel({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  try {
    await food.save();
    res.json({ success: true, message: "food added to backend" });
  } catch (error) {
    console.log("error", error.message + "is an error in adding the food");
    res.json({
      success: false,
      message: error.message + "is an error in adding the food",
    });
  }
};

const listFood = async (req, res) => {
  try {
    const foods = await foodModel.find({});
    console.log("items in food in food controllers ", foods);

    res.json({
      success: true,
      data: foods,
    });
  } catch (error) {
    console.log(error.message+'error in fetching the foods');
    res.json({
        success:false,
        message:error.message + " in fethching the food at admin level"
    })
  }
};

const removeFood = async (req, res) => {

    try {
        
        const food=await foodModel.findById(req.body.id);
        fs.unlink(`uploads/${food.image}`,()=>{}) // removing an image from local directory at backend
        
        await foodModel.findByIdAndDelete(req.body.id);
        
        res.json({
            success:true,
            message:"food is removed"
        })
    } catch (error) 
    {
        console.log('error in remove the food',erro.message);
        res.json({
            success:false, 
            message:error.message + "is the error in removing an item"
        })
        
        
    }





};

export { addFood, listFood, removeFood };
