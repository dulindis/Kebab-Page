import express from "express";
import { getShopData,getShopItem,getShopItemById,updateShopItemById } from "../controllers/product-controllers.js";

const router = express.Router();



router.get("/products", getShopData);
router.get("/products/slug/:slug", getShopItem);
router.get("/products/:id", getShopItemById);
router.post("/products/:id",updateShopItemById);



export { router };
