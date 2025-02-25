import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.get("/", homeController.getHomePage);
  router.get("/user", userController.getUser);
  router.get("/create_user", userController.getCreateUser);
  router.post("/post_create_user", userController.postCreateUser);

  return app.use("/", router);
};
module.exports = initWebRoutes;
