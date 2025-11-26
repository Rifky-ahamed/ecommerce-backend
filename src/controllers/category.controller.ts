import { Request, Response } from "express";
import Category from "../models/category.model";
import Product from "../models/product.model";
import mongoose from "mongoose";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const category = await Category.create(req.body);
    res.status(201).json(category);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const getCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Category.find(); // fetch all
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories", error });
  }
};

// Get category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(category);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update category
export const updateCategory = async (req: Request, res: Response) => {
  try {
    const updatedCategory = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // return updated document
    );
    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json(updatedCategory);
  } catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

export const deleteCategory = async (req: Request, res: Response) => {
  try {
    const categoryId = req.params.id;

    // Validate category ID
    if (!mongoose.Types.ObjectId.isValid(categoryId)) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    // Check if category exists
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    // Check if any products are linked to this category
    const linkedProduct = await Product.findOne({ categoryId });
    if (linkedProduct) {
      return res.status(400).json({
        message: "Cannot delete category because products are linked to it",
      });
    }

    // Safe to delete category
    await Category.findByIdAndDelete(categoryId);

    res.status(200).json({ message: "Category deleted successfully" });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};