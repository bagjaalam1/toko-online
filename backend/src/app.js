import express from "express";
import cors from "cors";
import productRoutes from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "Toko Tanaman API",
    endpoints: {
      products: "/api/products",
      categories: "/api/categories"
    }
  });
});

app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error"
  });
});

export default app;
