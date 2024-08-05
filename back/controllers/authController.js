import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import genToken from "../utils/genToken.js";

export const createUser = async (req, res) => {
 
  try {
    const { fullname, email, password,admin} = req.body;
    
     
    let user = await userModel.findOne({ email });
    if (user) {
      return res.status(500).send("User Already Exist");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await userModel.create({
      fullname,
      email,
      password: hashedPassword,
      isAdmin: admin,
    });

    let token = genToken(user);
    res.cookie("token", token);
    res.status(200).send("Created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).send("user not found");
    }

    bcrypt.compare(password, user.password, function (err, result) {
      if (err) {
        return res.status(500).send(err.message);
      }

      if (result) {
        const token = genToken(user);
        res.cookie("token", token);
        return res.status(200).send("Loged-In");
      }
      res.status(500).send("user not found");
    });
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token");
  res.status(200).send("Logged out successfully");
};
