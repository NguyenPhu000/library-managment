import express from "express";
import homeRoutes from "./homeRoutes.js";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./bookRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
import adminRoutes from "./adminRoutes.js";
import memberRoutes from "./memberRoutes.js";
import authRoutes from "./authRoutes.js";
import loanRoutes from "./loanRoutes.js";
import authMiddleware from "../middlewares/authMiddleware.js";
let router = express.Router();

router.use("/", authRoutes);

// router.use(authMiddleware);

router.use("/", homeRoutes);
router.use("/", userRoutes);
router.use("/", bookRoutes);
router.use("/", categoryRoutes);
router.use("/", adminRoutes);
router.use("/", memberRoutes);
router.use("/", loanRoutes);

const initWebRoutes = (app) => {
  app.use("/", router);
};

export default initWebRoutes;
