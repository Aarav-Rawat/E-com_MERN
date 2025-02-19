import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/genToken.js";

export const createUser = async (req, res) => {
 
  try {
    const { fullname, email, password, seller} = req.body;
     
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(200).send("User Already Exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
  
    user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      isSeller: seller
    });

    let token = genToken(user);
   
    res.status(200).json({
      msg: "Created",
      username: user.fullname,
      isSeller: user.isSeller,
      token: token,
   });
  } catch (err) {
    res.status(200).send(err.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Please provide email and password"
      });
    }

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = genToken(user);

    res.status(200).json({
      success: true,
      msg: "Logedin",
      username: user.fullname,
      token: token,
      isSeller: user.isSeller
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({
      success: false,
      message: "Server error during login"
    });
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out successfully");
};
