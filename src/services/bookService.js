import db from "../models/index.js";

let getAllBooks = () => {
  return new Promise(async (resolve, reject) => {
    try {
      let books = await db.Book.findAll({
        raw: true, //hien thi du lieu goc
      });
      resolve(books);
    } catch (error) {
      console.log(error);
    }
  });
};

let createNewBooks = async (bookData) => {
  try {
    if (!bookData.isbn || bookData.isbn.trim() === "") {
      throw new Error("ISBN cannot be empty!");
    }

    const newBook = await db.Book.create({
      isbn: bookData.isbn.trim(),
      title: bookData.title,
      author: bookData.author,
      publication_year: bookData.publication_year,
      publisher: bookData.publisher,
      total_copies: bookData.total_copies,
      available_copies: bookData.available_copies,
      status: bookData.status,
      category: bookData.category,
      cover_image: bookData.cover_image ? bookData.cover_image : [],
    });
    if (bookData.category_id) {
      await db.BookCategory.create({
        book_id: newBook.book_id,
        category_id: bookData.category_id,
      });
    }
    return newBook;
  } catch (error) {
    console.error("Error creating book:", error);
    throw error;
  }
};

let updateBook = async (bookId, bookData) => {
  if (!bookId) {
    throw new Error("Book ID is missing!");
  }

  try {
    const book = await db.Book.findOne({
      where: { book_id: bookId },
    });

    if (!book) throw new Error("Book not found!");

    await db.Book.update(
      {
        title: bookData.title,
        author: bookData.author,
        publication_year: bookData.publication_year,
        publisher: bookData.publisher,
        total_copies: bookData.total_copies,
        available_copies: bookData.available_copies,
        status: bookData.status,
        category: bookData.category,
        cover_image: bookData.cover_image || book.cover_image,
      },
      { where: { book_id: bookId } }
    );

    if (bookData.category_id) {
      await db.BookCategory.destroy({
        where: { book_id: bookId },
      });
      await db.BookCategory.create({
        book_id: bookId,
        category_id: bookData.category_id,
      });
    }
    return "Book updated successfully!";
  } catch (error) {
    throw new Error("Error updating book: " + error.message);
  }
};
let deleteBook = async (bookId) => {
  try {
    if (!bookId) {
      throw new Error("Book ID is required!");
    }

    const book = await db.Book.findOne({ where: { book_id: bookId } });
    if (!book) {
      throw new Error("Book not found!");
    }

    await db.BookCategory.destroy({ where: { book_id: bookId } });

    await db.Book.destroy({ where: { book_id: bookId } });

    return "Book deleted successfully!";
  } catch (error) {
    throw new Error("Error deleting book: " + error.message);
  }
};
module.exports = {
  getAllBooks: getAllBooks,
  createNewBooks: createNewBooks,
  updateBook: updateBook,
  deleteBook: deleteBook,
};
