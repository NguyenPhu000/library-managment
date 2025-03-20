import React, { useState } from "react";
import { useBook } from "../../contexts/BookContext";
import Pagination from "../common/Pagination";
import { Link } from "react-router-dom";
import { generateSlug } from "../../utils/slugify";
import { motion } from "framer-motion";

const BookList = () => {
  const { filteredBooks, loading } = useBook();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const indexOfLastBook = currentPage * itemsPerPage;
  const indexOfFirstBook = indexOfLastBook - itemsPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <>
      <motion.section
        className="container mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delayChildren: 0.3, staggerChildren: 0.1 }}
      >
        {loading ? (
          <motion.p
            className="text-center col-span-full text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            ⏳ Đang tải sách...
          </motion.p>
        ) : currentBooks.length > 0 ? (
          currentBooks.map((book) => {
            const slug = generateSlug(book.book_id); // ✅ Sử dụng book_id để tạo slug
            return (
              <motion.div
                key={book.book_id}
                className="motion-container"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/books/${slug}`}>
                  <motion.div
                    className="relative bg-gray-800 rounded-lg shadow-md overflow-hidden group hover:shadow-2xl cursor-pointer"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="relative overflow-hidden">
                      <motion.img
                        src={book.cover_image}
                        alt={book.title || "Không có tiêu đề"}
                        className="w-full h-72 object-cover"
                        whileHover={{ scale: 1.1 }}
                        transition={{ duration: 0.3 }}
                      />
                      {/* Hiệu ứng sáng bóng di chuyển từ trái trên xuống */}
                      <div
                        className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,transparent_25%,rgba(255,255,255,.3)_50%,transparent_75%,transparent_100%)]
                                          bg-[length:250%_250%] bg-[position:-100%_-100%] bg-no-repeat transition-[background-position_0s_ease] group-hover:bg-[position:200%_200%] group-hover:duration-[1500ms]"
                      ></div>
                    </div>
                    <div className="p-4">
                      <h3 className="text-lg font-semibold text-white truncate">
                        {book.title || "Không có tiêu đề"}
                      </h3>
                      <p className="text-gray-400 text-sm truncate">
                        ✍️ {book.author || "Không rõ tác giả"}
                      </p>
                    </div>
                  </motion.div>
                </Link>
              </motion.div>
            );
          })
        ) : (
          <motion.p
            className="text-center col-span-full text-white text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            📚 Không có sách nào...
          </motion.p>
        )}
      </motion.section>
      {filteredBooks.length > itemsPerPage && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Pagination
            totalItems={filteredBooks.length}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            onPageChange={handlePageChange}
          />
        </motion.div>
      )}
    </>
  );
};

export default BookList;
