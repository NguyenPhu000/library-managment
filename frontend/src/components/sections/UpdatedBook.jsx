import React, { useEffect, useState } from "react";
import bookService from "../../services/bookservice";

const UpdatedBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getBooks();
        console.log("📌 API Response:", response); // Debug API

        // Kiểm tra nếu có dữ liệu books, sắp xếp theo `updated_at` mới nhất
        const sortedBooks = response.books
          ? [...response.books].sort(
              (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            )
          : [];

        setBooks(sortedBooks.slice(0, 8)); // Hiển thị tối đa 8 cuốn mới nhất
      } catch (error) {
        console.error("❌ Lỗi khi lấy sách:", error);
        setBooks([]); // Đảm bảo state không bị undefined
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="py-20 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-gray-400 to-green-400 text-transparent bg-clip-text mb-12">
        📖 Sách Mới Cập Nhật
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-6 max-w-6xl mx-auto">
        {books.length > 0 ? (
          books.map((book) => (
            <div
              key={book.book_id}
              className="p-6 bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-2"
            >
              <img
                src={book.cover_image}
                alt={book.title}
                className="w-full h-72 object-cover rounded-lg mb-4"
              />
              <h3 className="text-2xl font-semibold">{book.title}</h3>
              <p className="text-gray-300">Tác giả: {book.author}</p>
              <p className="text-gray-400 text-sm">
                🕒 Cập nhật:{" "}
                {new Date(book.updated_at).toLocaleDateString("vi-VN")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-400">📚 Đang tải sách...</p>
        )}
      </div>
    </section>
  );
};

export default UpdatedBook;
