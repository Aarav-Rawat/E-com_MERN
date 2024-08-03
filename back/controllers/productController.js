import productModel from "../models/productModel.js"

export const createProduct = async (req,res)=>{
    try{
     const {image,model,price} = req.body;
    await productModel.create({
          image,
          model,
          price,
     })
     res.status(200).send("product created");
    }
    catch(err){
         res.status(500).send(err.message);
    }
 }

 export const getProduct = async (req,res)=>{
     try{
          const products = await productModel.find();
          const productData = products.map(product => ({
            model: product.model,
            price: product.price,
            image: product.image.toString('base64'),
          }));
          res.status(200).json(productData);
     }
     catch(err){
          res.status(500).send(err.message);
     }
 }