import express from "express";
import homeController from "../controllers/homeController";
import userController from "../controllers/userController";
import bookController from "../controllers/bookController";
import upload from "../config/multerConfig";

let router = express.Router();

let initWebRoutes = (app) => {
  // home route
  router.get("/", homeController.getHomePage);

  //user route
  router.get("/users", userController.getDisplayUser);
  router.get("/users/create", userController.getCreateUser);
  router.post("/users/create", userController.postCreateUser);
  router.post("/users/update", userController.updateUser);
  router.get("/users/delete", userController.deleteUser);
  router.get(
    "/users/toggle-user-active",
    userController.toggleUserActiveStatus
  );

  // book routes
  router.get("/books", bookController.getDisplayBooks);
  router.get("/books/create", bookController.getCreateBooks);
  router.post(
    "/books/create",
    upload.single("cover_image"),
    bookController.postCreateBooks
  );
  router.post(
    "/books/update",
    upload.single("cover_image"),
    bookController.updateBook
  );
  router.get("/books/delete", bookController.deleteBook);

  return app.use("/", router);
};

module.exports = initWebRoutes;
