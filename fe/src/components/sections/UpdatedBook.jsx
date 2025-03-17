import React, { useEffect, useState } from "react";
import bookService from "../../services/bookservice";

const UpdatedBook = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await bookService.getBooks();

        const sortedBooks = response.books
          ? [...response.books].sort(
              (a, b) => new Date(b.updated_at) - new Date(a.updated_at)
            )
          : [];

        setBooks(sortedBooks.slice(0, 10)); // Hiển thị tối đa 8 cuốn mới nhất
      } catch (error) {
        console.error("❌ Lỗi khi lấy sách:", error);
        setBooks([]);
      }
    };

    fetchBooks();
  }, []);

  return (
    <section className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 py-20 bg-gray-900 text-white text-center">
      <h2 className="text-4xl font-extrabold bg-gradient-to-r from-white via-gray-400 to-green-400 text-transparent bg-clip-text mb-12 col-span-full">
        Sách Mới Cập Nhật
      </h2>

      {books.length > 0 ? (
        books.map((book) => (
          <div
            key={book.book_id}
            className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden
                       group hover:shadow-2xl transition duration-300 cursor-pointer"
          >
            {/* Ảnh bìa với hiệu ứng sáng bóng */}
            <div className="relative overflow-hidden">
              <img
                src={book.cover_image}
                alt={book.title}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              />

              {/* Hiệu ứng sáng bóng di chuyển từ trái trên xuống */}
              <div
                className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,.3)_50%,transparent_75%,transparent_100%)]
                       bg-[length:250%_250%] bg-[position:-100%_-100%] bg-no-repeat transition-[background-position_0s_ease] group-hover:bg-[position:200%_200%] group-hover:duration-[1500ms]"
              ></div>
            </div>

            {/* Nội dung sách */}
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white truncate">
                {book.title}
              </h3>
              <p className="text-gray-400 text-sm truncate">✍️ {book.author}</p>

              {/* Thông tin bổ sung (ngày cập nhật) */}
              <div className="mt-2 flex items-center justify-between text-gray-400 text-sm">
                <span>
                  🕒 Cập nhật:{" "}
                  {new Date(book.updated_at).toLocaleDateString("vi-VN")}
                </span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full text-white text-lg">
          📚 Không có sách mới nào...
        </p>
      )}
    </section>
  );
};

export default UpdatedBook;
