import db from "../models/index.js";
import { Op } from "sequelize";

let getBookById = async (bookId) => {
  if (!bookId) throw new Error("Book ID is required!");
  const book = await db.Book.findOne({
    where: { book_id: bookId },
    include: [
      { model: db.Category, as: "categories", through: { attributes: [] } },
    ],
  });
  if (!book) throw new Error("Book not found!");
  return book;
};

let getAllBooks = async () => {
  return await db.Book.findAll({
    include: [
      { model: db.Category, as: "categories", through: { attributes: [] } },
    ],
  });
};

let createNewBooks = async (req) => {
  let newBookData = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publication_year: req.body.publication_year,
    publisher: req.body.publisher,
    total_copies: req.body.total_copies,
    available_copies: req.body.available_copies,
    status: req.body.status,
    category: req.body.category,
    cover_image: req.file ? req.file.filename : null,
    category_id: Array.isArray(req.body.category_id)
      ? req.body.category_id
      : [req.body.category_id],
  };

  return await db.Book.create(newBookData);
};

let updateBook = async (req) => {
  let bookId = req.body.book_id;
  if (!bookId) {
    throw new Error("Book ID is required!");
  }
  const existingBook = await getBookById(bookId);

  let coverImage =
    req.file?.filename || req.body.current_cover || existingBook.cover_image;

  let allCategories = await db.Category.findAll({
    attributes: ["category_id"],
  });
  let validCategoryIds = new Set(allCategories.map((cat) => cat.category_id));

  let categoryIds = req.body.category_id
    ? []
        .concat(req.body.category_id)
        .map((id) => parseInt(id))
        .filter((id) => validCategoryIds.has(id))
    : existingBook.categories.map((cat) => cat.category_id) || [];

  let updatedBookData = {
    isbn: req.body.isbn,
    title: req.body.title,
    author: req.body.author,
    publication_year: req.body.publication_year,
    publisher: req.body.publisher,
    total_copies: req.body.total_copies,
    available_copies: req.body.available_copies,
    status: req.body.status,
    cover_image: coverImage,
    category_id: categoryIds.length
      ? categoryIds
      : existingBook.categories.map((cat) => cat.category_id) || [],
  };

  await db.Book.update(updatedBookData, { where: { book_id: bookId } });

  if (req.body.category_id && req.body.category_id.length > 0) {
    await db.BookCategory.destroy({ where: { book_id: bookId } });
    await existingBook.addCategories(req.body.category_id);
  }
};

let deleteBook = async (req) => {
  let bookId = req.query.id;
  if (!bookId) throw new Error("Book ID is required!");

  const book = await getBookById(bookId);

  await db.BookCategory.destroy({ where: { book_id: bookId } });
  await db.Book.destroy({ where: { book_id: bookId } });
};

let searchBook = async (filters) => {
  try {
    let whereClause = {};

    if (filters.criteria && filters.query) {
      whereClause[filters.criteria] = { [Op.like]: `%${filters.query}%` };
    }

    let books = await db.Book.findAll({
      where: whereClause,
      include: [
        { model: db.Category, as: "categories", through: { attributes: [] } },
      ],
    });
    return books;
  } catch (error) {
    throw new Error("Không thể tìm kiếm sách, vui lòng thử lại!");
  }
};
export default {
  getBookById,
  getAllBooks,
  createNewBooks,
  updateBook,
  deleteBook,
  searchBook,
};
