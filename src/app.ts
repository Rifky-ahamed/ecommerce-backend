import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";

dotenv.config();
connectDB();

const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());

// category routes
app.use("/api/categories", categoryRoutes);

// product routes
app.use("/api/products", productRoutes);

app.listen(5000, () => {
  console.log(`the Server running at http://localhost:${PORT}`);
});


