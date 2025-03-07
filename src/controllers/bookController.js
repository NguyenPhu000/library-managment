import bookService from "../services/bookService";
import categoryService from "../services/categoryService";

let getCreateBooks = (req, res) => {
  res.render("partials/createBook");
};

let postCreateBooks = async (req, res) => {
  try {
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

    await bookService.createNewBooks(newBookData);

    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();
    res.render("bookPage", { dataTable: data, categories: categories || [] });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: error.message });
  }
};

// Display all books
let getDisplayBooks = async (req, res) => {
  try {
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();

    res.render("bookPage", {
      dataTable: data,
      categories: categories ? categories : [],
      currentPage: "books",
    });
  } catch (error) {
    console.error("Error displaying books:", error);
    res.status(500).send(error.message);
  }
};

let updateBook = async (req, res) => {
  try {
    let bookId = req.body.book_id;
    console.log("Updating Book ID:", bookId);

    let bookData = {
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
      assigned_by: req.user ? req.user.user_id : null,
    };

    await bookService.updateBook(bookId, bookData);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();
    res.render("bookPage", { dataTable: data, categories });
  } catch (error) {
    console.error("Error updating book:", error);
    res.status(500).send(error.message);
  }
};

let deleteBook = async (req, res) => {
  try {
    let bookId = req.query.id;
    console.log("Deleting book with ID:", bookId);

    if (!bookId) {
      return res.status(400).send("Book ID is required");
    }

    await bookService.deleteBook(bookId);
    let data = await bookService.getAllBooks();
    let categories = await categoryService.getAllCategory();

    res.render("bookPage", { dataTable: data, categories: categories || [] });
    res.render("bookPage", { dataTable: data });
  } catch (error) {
    console.error("Error deleting book:", error);
    res.status(500).send(error.message);
  }
};

module.exports = {
  getCreateBooks,
  postCreateBooks,
  getDisplayBooks,
  updateBook,
  deleteBook,
};
