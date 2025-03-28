import API from "./api";

// Lấy danh sách tất cả sách
const getBooks = async () => {
  try {
    const response = await API.get("/books");

    if (!response.data || !response.data.books) {
      return { books: [] };
    }

    const formattedBooks = response.data.books.map((book) => ({
      ...book,
      cover_image: book.cover_image
        ? `http://localhost:8081/uploads/${book.cover_image.replace(
            /['"]+/g,
            ""
          )}`
        : "https://via.placeholder.com/150",
    }));

    return { books: formattedBooks };
  } catch (error) {
    console.error("❌ API Error:", error);
    return { books: [] };
  }
};

// Lấy sách theo danh mục
const getBooksByCategory = async (categoryId) => {
  try {
    const response = await API.get(`/books/category/${categoryId}`);

    if (!response.data || !response.data.books) {
      return { books: [] };
    }

    const formattedBooks = response.data.books.map((book) => ({
      ...book,
      cover_image: book.cover_image
        ? `http://localhost:8081/uploads/${book.cover_image.replace(
            /['"]+/g,
            ""
          )}`
        : "https://via.placeholder.com/150",
    }));

    return { books: formattedBooks };
  } catch (error) {
    console.error("❌ API Error:", error);
    return { books: [] };
  }
};

// Lấy chi tiết sách theo book_id
const getBookById = async (bookId) => {
  try {
    const response = await API.get(`/books/${bookId}`);

    if (!response.data || !response.data.book) {
      return { book: null };
    }

    const book = {
      ...response.data.book,
      cover_image: response.data.book.cover_image
        ? `http://localhost:8081/uploads/${response.data.book.cover_image.replace(
            /['"]+/g,
            ""
          )}`
        : "https://via.placeholder.com/150",
    };

    return { book };
  } catch (error) {
    console.error("❌ API Error:", error);
    return { book: null };
  }
};

export default {
  getBooks,
  getBooksByCategory,
  getBookById,
};
