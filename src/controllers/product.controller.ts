import { Request, Response } from "express" ;
import Product from "../models/product.model" ;
import { ProductWithCategory, PopulatedCategory } from "../types";
import Category from "../models/category.model" ;

export const createProduct = async (req: Request, res: Response) => {
  try {
    console.log("REQ BODY:", req.body);  // 👈 LOG 1

    const { name, price, stock, categoryId, categoryName } = req.body;
    let finalCategoryId = categoryId;

    if (!finalCategoryId && categoryName) {
      const category = await Category.findOne({ name: categoryName });
      console.log("FOUND CATEGORY:", category);  // 👈 LOG 2
      if (!category) return res.status(400).json({ message: "Category not found" });
      finalCategoryId = category._id.toString();
    }

    console.log("FINAL CATEGORY ID:", finalCategoryId); // 👈 LOG 3

    const product = await Product.create({
      name,
      price,
      stock,
      categoryId: finalCategoryId,
    });

    console.log("PRODUCT CREATED:", product); // 👈 LOG 4

    res.status(201).json(product);
  } catch (error: any) {
    console.error(error); // 👈 LOG 5 ERROR
    res.status(400).json({ message: error.message });
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