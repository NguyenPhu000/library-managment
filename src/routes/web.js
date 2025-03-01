import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  // home route
  router.get("/", homeController.getHomePage);
  router.get("/home", homeController.getHomePage);
  //user route
  router.get("/user", userController.getCreateUser);
  router.post("/create-user", userController.postCreateUser);
  router.get("/list-user", userController.getDisplayUser);
  router.post("/put-user", userController.putUser);
  router.get("/delete-user", userController.deleteUser);
  router.get("/toggle-user-active", userController.toggleUserActiveStatus);
  router.post("/update-user", userController.putUser);

  return app.use("/", router);
};

module.exports = initWebRoutes;
