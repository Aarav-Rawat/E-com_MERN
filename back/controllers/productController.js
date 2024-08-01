import productModel from "../models/productModel.js"

export const createProduct = async (req,res)=>{
    try{
     const {image,model,price} = req.body;
     const product = await productModel.create({
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
          res.status(200).send(products);
     }
     catch(err){
          res.status(500).send(err.message);
     }
 }