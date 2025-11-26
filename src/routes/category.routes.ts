import { Router } from "express";
import { createCategory, getCategories, getCategoryById, updateCategory, deleteCategory } from "../controllers/category.controller";

const router = Router();

router.post("/", createCategory);
router.get("/", getCategories);

router.get("/:id", getCategoryById);    // GET /api/categories/:id
router.put("/:id", updateCategory);     // PUT /api/categories/:id
router.delete("/:id", deleteCategory);  // DELETE /api/categories/:id

export default router;
