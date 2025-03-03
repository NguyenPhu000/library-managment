import bookService from "../services/bookService";

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
    };

    await bookService.createNewBooks(newBookData);

    let data = await bookService.getAllBooks();
    res.render("homePage.ejs", { dataTable: data });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ error: error.message });
  }
};

let getDisplayBooks = async (req, res) => {
  try {
    let data = await bookService.getAllBooks();
    res.render("bookPage.ejs", { dataTable: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let updateBook = async (req, res) => {
  try {
    let bookId = req.body.book_id;
    console.log("Updating Book ID:", bookId); // Debug xem có nhận đúng ID không

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
    };

    await bookService.updateBook(bookId, bookData);
    return res.redirect("/");
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
    return res.redirect("/");
  } catch (error) {
    res.status(500).send(error.message);
  }
};
module.exports = {
  getDisplayBooks: getDisplayBooks,
  getCreateBooks: getCreateBooks,
  postCreateBooks: postCreateBooks,
  updateBook: updateBook,
  deleteBook: deleteBook,
};
