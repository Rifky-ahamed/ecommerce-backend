import { Router } from "express";
import { createCategory } from "../controllers/category.controller";

const router = Router();

router.post("/", createCategory);
// TODO: other CRUD routes...

export default router;
