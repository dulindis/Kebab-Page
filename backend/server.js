import express from "express";
import { router as shopRoutes } from "./routes/product-routes.js";
import { router as seedRoutes } from "./routes/seed-routes.js";
import { router as userRoutes } from "./routes/user-routes.js";
import { router } from "./routes/user-routes.js";


import mongoose from "mongoose";
import dotenv from "dotenv";
// import { ppid } from "process";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api", shopRoutes);
app.use("/api", seedRoutes);
app.use("/api", userRoutes);

// app.get("/api/products", (req, res) => {
//   res.send;
// });

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server at http://localhost:${PORT}`);
});
