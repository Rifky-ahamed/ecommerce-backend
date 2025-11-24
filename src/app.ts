import "dotenv/config";   // Loads the .env file
import { connectDB } from "./config/db";

const startApp = async () => {
  await connectDB();  // This will tell you if DB connected or not

  console.log("App started successfully!");
};

startApp();
