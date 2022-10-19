import express from "express";
import { getShopData,getShopItem,getShopItemById,updateShopItem } from "../controllers/product-controllers.js";

const router = express.Router();



router.get("/products", getShopData);
router.get("/products/slug/:slug", getShopItem);
router.get("/products/:id", getShopItemById);
router.post("/products/:id",updateShopItem);



export { router };
