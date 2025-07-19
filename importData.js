const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const products = require("./data/products.json");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const importData = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log("✅ Data Imported");
    process.exit();
  } catch (error) {
    console.error("❌ Import Failed:", error);
    process.exit(1);
  }
};

importData();
