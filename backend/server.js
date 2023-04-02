import express from "express";
import path from 'path';
import { router as shopRoutes } from "./routes/product-routes.js";
import { router as seedRoutes } from "./routes/seed-routes.js";
import { router as userRoutes } from "./routes/user-routes.js";
import { router as orderRoutes } from "./routes/order-routes.js";
import { router as stripeRoutes } from "./routes/stripe-routes.js";
// import { mailingController as mailingRoutes } from "./routes/contact-routes.js";

// import { router } from "./routes/user-routes.js";

import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
mongoose
  .connect(process.env.MONGODB_URI_LOCAL ? process.env.MONGODB_URI_LOCAL : process.env.MONGODB_URI)
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.log("error", err);
  });

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors()
  //   {origin:true,
  //   // credentials:true
  // }
);

// app.use(express.static("public"))
// app.use(express.urlencoded({ extended: false }));
// app.use(express.json());
// app.use(cors({origin:true,credentials:true}))

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "OPTIONS, GET, POST, PUT, PATCH, DELETE"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Accept, Content-Type,  X-Auth-Token, Authorization"
  );
  next();
});

// app.use(function(req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
//   next();
// });

app.use("/api", shopRoutes);
app.use("/api", seedRoutes);
app.use("/api", userRoutes);
app.use("/api", orderRoutes);
app.use("/api", stripeRoutes);
// app.use("/api", mailingRoutes);

app.get("/api/keys/paypal", (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || "sb");
});

// app.get("/api/products", (req, res) => {
//   res.send;
// });

const __dirname=path.resolve();
app.use(express.static(path.join(__dirname,'/frontend/build')));
app.get("*",(req,res)=>res.sendFile(path.join(__dirname,'/frontend/build/index.html')))

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`server at http://localhost:${PORT}`);
});
