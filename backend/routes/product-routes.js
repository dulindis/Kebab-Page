import express from "express";
import { getShopData } from "../controllers/product-controllers.js";

const router = express.Router();

router.get("/products", getShopData);

export { router };
