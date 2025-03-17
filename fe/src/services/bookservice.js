import API from "./api";
// lấy sách
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
    console.error("API Error:", error);
    return { books: [] };
  }
};
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
export default {
  getBooks,
  getBooksByCategory,
};
