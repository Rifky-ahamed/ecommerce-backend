import { Request, Response } from "express" ;
import Product from "../models/product.model" ;
import { ProductWithCategory, PopulatedCategory } from "../types";

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
    const products = await Product.find().populate<PopulatedCategory>("categoryId", "name -_id");

    // Map to format the response
    const formattedProducts = products.map((prod: any) => ({
      _id: prod._id,
      name: prod.name,
      price: prod.price,
      stock: prod.stock,
      category: prod.categoryId?.name || null,
    }));

    res.status(200).json(formattedProducts);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};