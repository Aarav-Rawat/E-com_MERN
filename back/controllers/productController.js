import productModel from "../models/productModel.js";
import userModel from "../models/userModel.js";

export const createProduct = async (req, res) => {
  try {
    const { model, price } = req.body;
    const product = await productModel.create({
      image: req.file.filename,
      model,
      price,
      seller: req.user.userId,
    });

    await userModel.findOneAndUpdate(
      { email: req.user.email },
      { $push: { products: product._id } }
    );

    res.status(200).send("product created");
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const getProduct = async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.user.email });
    const productsId = user.products;
    const productData = await Promise.all(
      productsId.map(async (id) => {
        return await productModel.findById({ _id: id });
      })
    );
    res.status(200).json(productData);
  } catch (err) {
    res.status(500).send(err.message);
  }
};

export const userProfile = (req,res) => {
  
}
