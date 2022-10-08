import express from "express";
import { seedData } from "../controllers/seed-controller.js";

const router = express.Router();
router.get("/seed",seedData);

export { router };
