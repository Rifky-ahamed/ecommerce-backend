import { Router } from "express";
import { createProduct, getProducts, getProductById, updateProduct, deleteProduct, searchProducts, filterProductsByCategory } from "../controllers/product.controller";

const router = Router();

router.post("/", createProduct);
router.get("/search", searchProducts);
router.get("/filter", filterProductsByCategory);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", updateProduct);
router.delete("/:id", deleteProduct);



export default router;