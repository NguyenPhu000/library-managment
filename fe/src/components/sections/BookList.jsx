// src/components/BookList.jsx
import React, { useState } from "react";
import { useBook } from "../../contexts/BookContext";
import Pagination from "../common/Pagination";

const BookList = () => {
  const { filteredBooks, loading } = useBook();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20; // Số lượng sách mỗi trang

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  // Hàm để xử lý khi người dùng chuyển trang
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <section className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4 ">
        {loading ? (
          <p className="text-center col-span-full text-white text-lg">
            ⏳ Đang tải sách...
          </p>
        ) : currentBooks.length > 0 ? (
          currentBooks.map((book) => (
            <div
              key={book.book_id}
              className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:shadow-2xl transition duration-300 cursor-pointer"
            >
              <div className="relative overflow-hidden">
                <img
                  src={book.cover_image}
                  alt={book.title}
                  className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                />
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
                <p className="text-gray-400 text-sm truncate">
                  ✍️ {book.author}
                </p>
                {/* Thêm thông tin khác */}
                <div className="mt-2 flex items-center justify-between text-gray-400 text-sm">
                  <span>
                    📅 {new Date(book.updated_at).toLocaleDateString("vi-VN")}
                  </span>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-white text-lg">
            📚 Không có sách nào...
          </p>
        )}
      </section>
      {filteredBooks.length > itemsPerPage && (
        <div className="w-full overflow-auto mt-6">
          {" "}
          <Pagination
            totalItems={filteredBooks.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </div>
      )}
    </>
  );
};

export default BookList;
