import express from "express";
import { getShopData,getShopItem } from "../controllers/product-controllers.js";

const router = express.Router();

router.get("/products", getShopData);
router.get("/products/slug/:slug", getShopItem);


export { router };
