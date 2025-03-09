import express from "express";
import authController from "../controllers/authController.js";
import { isAuthenticated, isAdmin } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/login", authController.postLogin);

export default router;
