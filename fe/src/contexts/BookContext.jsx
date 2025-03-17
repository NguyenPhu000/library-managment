import { createContext, useContext, useEffect, useState } from "react";
import bookService from "../services/bookservice";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      const response = await bookService.getBooks();
      setBooks(response.books);
      setFilteredBooks(response.books);
      setLoading(false);
    };
    fetchBooks();
  }, []);

  // ✅ Lọc theo category
  const filterByCategory = async (categoryId) => {
    setLoading(true);
    if (categoryId === "all") {
      setFilteredBooks(books);
    } else {
      const response = await bookService.getBooksByCategory(categoryId);
      setFilteredBooks(response.books);
    }
    setLoading(false);
  };

  return (
    <BookContext.Provider
      value={{ books, filteredBooks, loading, filterByCategory }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBook = () => useContext(BookContext);
