import { Request, Response } from "express" ;
import Product from "../models/product.model" ;
import { ProductWithCategory, PopulatedCategory } from "../types";
import Category from "../models/category.model" ;

export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, categoryId, categoryName } = req.body;

    let finalCategoryId = categoryId;

    // Convert categoryName → lowercase and check
    if (!finalCategoryId && categoryName) {
      const lowerName = categoryName.toLowerCase();

      const category = await Category.findOne({ name: lowerName });
      if (!category) {
        return res.status(400).json({ message: "Category not found" });
      }

      finalCategoryId = category._id.toString();
    }

    const product = await Product.create({
      name,
      price,
      stock,
      categoryId: finalCategoryId,
    });

    res.status(201).json(product);

  } catch (error: any) {
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

export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate<PopulatedCategory>("categoryId", "name");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error: any) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};


export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { name, price, stock, categoryId, categoryName } = req.body;

    let finalCategoryId = categoryId;

    // If categoryName is sent → lowercase → check in DB
    if (!finalCategoryId && categoryName) {
      const lowerName = categoryName.toLowerCase();

      const category = await Category.findOne({ name: lowerName });
      if (!category) {
        return res.status(400).json({ message: "Category not found" });
      }

      finalCategoryId = category._id.toString();
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { name, price, stock, categoryId: finalCategoryId },
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);

  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

 
export const deleteProduct = async (req: Request, res: Response) => {
  try {
    const deletedProduct = await Product.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error: any) {
    res.status(400).json({ message: "Invalid product ID" });
  }
};
