import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import bookService from "../../services/bookservice";
import { getBookIdFromSlug } from "../../utils/slugify";
import { motion } from "framer-motion";

const BookDetail = () => {
  const { slug } = useParams();
  const book_id = getBookIdFromSlug(slug);
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBook = async () => {
      if (!book_id) return;
      setLoading(true);
      const response = await bookService.getBookById(book_id);
      setBook(response.book);
      setLoading(false);
    };
    fetchBook();
  }, [book_id]);

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, staggerChildren: 0.1 },
    },
  };

  const imageVariants = {
    hover: { scale: 1.05, transition: { duration: 0.3 } },
  };

  if (loading) {
    return (
      <motion.div
        className="bg-[#12181B] min-h-screen flex justify-center items-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <p className="text-center text-white text-xl font-semibold animate-pulse">
          ⏳ Đang tải sách...
        </p>
      </motion.div>
    );
  }

  if (!book) {
    return (
      <motion.div
        className="bg-[#12181B] min-h-screen flex justify-center items-center"
        variants={pageVariants}
        initial="initial"
        animate="animate"
      >
        <p className="text-center text-white text-xl font-semibold">
          ❌ Sách không tồn tại!
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="bg-[#0F172A] min-h-screen py-8"
      variants={pageVariants}
      initial="initial"
      animate="animate"
    >
      <div className="container mx-auto px-4">
        <motion.div
          className="bg-[#1E293B] rounded-lg shadow-xl overflow-hidden"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="p-8">
            <motion.div className="mb-6">
              <Link
                to="/books"
                className="inline-block text-gray-400 hover:text-lightGreen transition duration-300"
              >
                ← Quay lại danh sách sách
              </Link>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
              {/* Phần bên trái: Ảnh bìa */}
              <motion.div className="md:col-span-4 flex justify-center group relative overflow-hidden">
                <motion.img
                  src={book.cover_image}
                  alt={book.title || "Không có tiêu đề"}
                  className="w-48 md:w-64 h-auto rounded-md shadow-lg border border-gray-700 transition-transform duration-300 group-hover:scale-105"
                  variants={imageVariants}
                  whileHover="hover"
                />
                {/* Hiệu ứng sáng bóng di chuyển từ trái trên xuống */}
                <div
                  className="absolute inset-0 overflow-hidden bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,.2)_60%,transparent_70%,transparent_100%)]
                                    bg-[length:150%_150%] bg-[position:-50%_-50%] bg-no-repeat transition-[background-position_0s_ease] group-hover:bg-[position:150%_150%] group-hover:duration-[1000ms]"
                ></div>
              </motion.div>

              {/* Phần bên phải: Thông tin chính */}
              <div className="md:col-span-8 text-white">
                <motion.h1 className="text-3xl md:text-4xl font-bold mb-2 text-lightGreen">
                  {book.title || "Không có tiêu đề"}
                </motion.h1>
                <motion.p className="text-gray-300 text-lg mb-1">
                  Tác giả:{" "}
                  <span className="text-lightGreen">
                    {book.author || "Không rõ tác giả"}
                  </span>
                </motion.p>

                {book.status && (
                  <motion.p className="text-sm text-lightGreen font-semibold mb-4">
                    {book.status === "available"
                      ? "✅ Còn Sách"
                      : "❌ Hết Sách"}
                  </motion.p>
                )}
                {book.description && (
                  <motion.p className="text-gray-300 leading-relaxed mb-6">
                    {book.description.substring(0, 200)}...
                  </motion.p>
                )}
                <motion.button
                  className="bg-lightGreen hover:bg-[#98FB98] text-[#1E293B] font-bold py-3 px-6 rounded-md"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Mượn
                </motion.button>

                <motion.section className="py-6 md:py-8 border-t border-gray-700 mt-6">
                  <motion.h2 className="text-xl font-semibold mb-3 text-lightGreen">
                    Chi tiết sách
                  </motion.h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-400">
                    {book.publication_year && (
                      <div>
                        <span className="font-semibold text-gray-300">
                          Năm xuất bản:
                        </span>{" "}
                        <span className="text-lightGreen">
                          {book.publication_year}
                        </span>
                      </div>
                    )}
                    {book.publisher && (
                      <div>
                        <span className="font-semibold text-gray-300">
                          Nhà xuất bản:
                        </span>{" "}
                        <span className="text-lightGreen">
                          {book.publisher}
                        </span>
                      </div>
                    )}

                    {book.genre && (
                      <div>
                        <span className="font-semibold text-gray-300">
                          Thể loại:
                        </span>{" "}
                        <span className="text-lightGreen">{book.genre}</span>
                      </div>
                    )}
                    <div>
                      <span className="font-semibold text-gray-300">ISBN:</span>{" "}
                      <span className="text-lightGreen">978-1234567890</span>
                    </div>
                    <div>
                      <span className="font-semibold text-gray-300">
                        Định dạng:
                      </span>{" "}
                      <span className="text-lightGreen">Bìa mềm</span>
                    </div>
                  </div>
                </motion.section>
              </div>
            </div>

            {/* Phần mô tả đầy đủ */}
            {book.description && (
              <motion.section className="py-6 md:py-8 border-t border-gray-700 text-white">
                <motion.div className="px-6 md:px-8">
                  <motion.h2 className="text-xl font-semibold mb-3 text-lightGreen">
                    Mô tả
                  </motion.h2>
                  <motion.p className="text-gray-300 leading-relaxed">
                    {book.description}
                  </motion.p>
                </motion.div>
              </motion.section>
            )}

            {/* Phần thông tin chi tiết khác (chủ đề, địa điểm...) */}
            <motion.section className="py-6 md:py-8 border-t border-gray-700 text-white">
              <motion.div className="px-6 md:px-8">
                <motion.h2 className="text-xl font-semibold mb-3 text-lightGreen">
                  Thông tin khác
                </motion.h2>
                <div className="space-y-2 text-sm text-gray-400">
                  {book.total_copies !== undefined && (
                    <p>
                      <span className="font-semibold text-gray-300">
                        Tổng số bản:{" "}
                      </span>
                      <span className="text-lightGreen">
                        {book.total_copies}
                      </span>
                    </p>
                  )}
                  {book.available_copies !== undefined && (
                    <p>
                      <span className="font-semibold text-gray-300">
                        Sẵn có:{" "}
                      </span>
                      <span className="text-lightGreen">
                        {book.available_copies}
                      </span>
                    </p>
                  )}
                </div>
              </motion.div>
            </motion.section>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default BookDetail;
