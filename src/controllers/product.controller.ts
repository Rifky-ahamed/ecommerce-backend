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
    // 1️⃣ Read page & limit from query
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;

    // 2️⃣ Calculate skip
    const skip = (page - 1) * limit;

    // 3️⃣ Fetch paginated products + populate
    const products = await Product.find()
      .populate<PopulatedCategory>("categoryId", "name -_id")
      .skip(skip)
      .limit(limit);

    // 4️⃣ Format the response
    const formattedProducts = products.map((prod: any) => ({
      _id: prod._id,
      name: prod.name,
      price: prod.price,
      stock: prod.stock,
      category: prod.categoryId?.name || null,
    }));

    // 5️⃣ Total product count (for frontend pagination buttons)
    const totalProducts = await Product.countDocuments();

    res.status(200).json({
      total: totalProducts,
      page,
      limit,
      totalPages: Math.ceil(totalProducts / limit),
      data: formattedProducts,
    });

  } catch (error) {
    res.status(500).json({ message: "Failed to fetch products", error });
  }
};
