import { Request, Response } from "express" ;
import Product from "../models/product.model" ;

export const createProduct = async (req: Request, res: Response) =>{
try{
    const product = await Product.create(req.body);
    res.status(201).json(product);
}catch(error:any){
    res.status(400).json({message: error.message});
}
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find(); // fetch all
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch Products", error });
  }
};