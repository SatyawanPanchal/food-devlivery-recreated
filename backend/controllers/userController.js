import userModel from "../models/userModel.js";
import validator from "validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import 'dotenv/config'

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });
    //if user is not found
    console.log('we got from database',user);
    const username=user.name;
    if (!user) {
      return res.json({
        success: false,
        message: "no such user email not found or matched",
      });
    }

    // if user is found but password is not matched
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.json({
        success: false,
        message: "no such password exists",
      });
    }

    // if both email and passwords are matched then create the token and revert

    const token = createToken(user._id);

    return res.json({
      success: true,
      message: "we have got the user",
      username,
      token,
    });
  } catch (error) {
    return res.json({
      success: false,
      message: `${error.message}`,
    });
  }
};

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  console.log('register request on server side');
  
    
  try {
  

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Email is not a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        success: false,
        message: `length of password is less than eight`,
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    console.log('we have saved',user.name);
    
    const userName=user.name;
    const token = createToken(user._id);
    res.json({ success: true, token, userName });
  } catch (error) {
    return res.json({
      success: false,
      message: error.message + "is the error",
    });
  }
};

export { loginUser, registerUser };
