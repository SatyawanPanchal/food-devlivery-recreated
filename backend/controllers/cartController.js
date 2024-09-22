import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    let userData = await userModel.findOne({ _id: req.body.userId });
    let cartData = await userData.cartData;
    if (!cartData[req.body.itemId]) {
      cartData[req.body.itemId] = 1;
    } else {
      cartData[req.body.itemId] += 1;
    }
    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
  } catch (error) {
    res.json({
      success: false,
      message: error.message + "element not added ",
    });
  }
};

const removeFromCart = async (req, res) => {
  try {
    let userData = await userModel.findById(req.body.userId);
    let cartData = await userData.cartData;

    if (cartData[req.body.itemId] > 0) {
      cartData[req.body.itemId] -= 1;
    }

    await userModel.findByIdAndUpdate(req.body.userId, { cartData });
    res.json({ success: true, message: "item successfully removed" });
  } catch (error) {
    console.log("error", error);

    res.json({
      success: false,
      message: error.message + " => is error in removing data",
    });
  }
};

const getItemsFromCart = async (req, res) => {

    try {
        let userData=await userModel.findById(req.body.userId);
        let cartData=await userData.cartData;
        
        res.json({success:true , message :"got the cartData successfully 🙏",cartData})

    } catch (error) {
        res.json({
            success:false,
            message : error.message +"=>error in getting the cart"
        })
        
    }


};

export { addToCart, removeFromCart, getItemsFromCart };
