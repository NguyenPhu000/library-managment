import express from "express";
import userController from "../controllers/userController";

let router = express.Router();

//user route
router.get("/users", userController.getDisplayUser);
router.get("/users/create", userController.getCreateUser);
router.post("/users/create", userController.postCreateUser);
router.post("/users/update", userController.updateUser);
router.get("/users/delete", userController.deleteUser);
router.get("/users/toggle-user-active", userController.toggleUserActiveStatus);

export default router;
