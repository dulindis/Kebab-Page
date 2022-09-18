import express from "express";
import { router as shopRoutes } from "./routes/product-routes.js";

const app = express();

app.use("/api", shopRoutes);

// app.get("/api/products", (req, res) => {
//   res.send;
// });

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server at http://localhost:${PORT}`);
});
