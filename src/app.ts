import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import categoryRoutes from "./routes/category.routes";
import productRoutes from "./routes/product.routes";
import cors from "cors";
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("../swagger/swagger.json");

dotenv.config();
connectDB();


const PORT = process.env.PORT || 5000;
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:3000" }));
// category routes
app.use("/api/categories", categoryRoutes);

// product routes
app.use("/api/products", productRoutes);

// Swagger API documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.listen(5000, () => {
  console.log(`the Server running at http://localhost:${PORT}`);
});


