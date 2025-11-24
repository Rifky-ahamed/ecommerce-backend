import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import categoryRoutes from "./routes/category.routes";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/categories", categoryRoutes);

app.listen(5000, () => {
  console.log("Server running on port 5000");
});
