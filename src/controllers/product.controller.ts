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