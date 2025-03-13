import express from "express";
import bookController from "../controllers/bookController";
import upload from "../config/multerConfig";

let router = express.Router();

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

export default router;
