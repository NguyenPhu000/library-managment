import express from "express";
import homeRoutes from "./homeRoutes.js";
import userRoutes from "./userRoutes.js";
import bookRoutes from "./bookRoutes.js";
import categoryRoutes from "./categoryRoutes.js";
let router = express.Router();

router.use("/", homeRoutes);
router.use("/", userRoutes);
router.use("/", bookRoutes);
router.use("/", categoryRoutes);

const initWebRoutes = (app) => {
  app.use("/", router);
};

export default initWebRoutes;
