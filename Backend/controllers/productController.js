import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";


export const createProduct = async (req, res) => {
  console.log(req.body)  
  try {
    const { model, price } = req.body;
      const product = await productModel.create({
      image: req.file.filename,
      model,
      price,
      owner: req.user._id
    });

    await userModel.updateOne({email: req.user.email},
      {$push: {products: product._id}}
    )

    res.status(200).send("product created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    res.status(200).json(products);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const product = await productModel.findOne({_id: req.body.id});
    res.status(200).json(product);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

