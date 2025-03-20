import { useState } from "react";
import { useCategory } from "../../contexts/CategoryContext";
import { useBook } from "../../contexts/BookContext";
import { FaFolderOpen } from "react-icons/fa"; // Import thư viện icon nếu chưa có

const CategoryFilter = () => {
  const { categories, loading } = useCategory();
  const { filterByCategory } = useBook();
  const [selectedCategory, setSelectedCategory] = useState(null); // Chỉ chọn 1 danh mục

  // Xử lý chọn danh mục (Chỉ cho phép 1 danh mục)
  const handleCategoryChange = (categoryId) => {
    setSelectedCategory((prev) => (prev === categoryId ? null : categoryId)); // Chọn hoặc bỏ chọn
    filterByCategory(categoryId);
  };

  return (
    <section className="bg-gray-900 p-5 rounded-lg shadow-md border-2 border-gray-700">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 border-b border-gray-700 pb-2">
        <h2 className="text-white font-semibold text-xl flex items-center">
          <FaFolderOpen className="mr-2 text-lightGreen" /> Thể Loại
        </h2>
      </div>

      {/* Danh sách thể loại */}
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 text-white">
        {/* Nút "Tất Cả" */}
        <label className="flex items-center space-x-2 cursor-pointer text-base md:text-lg">
          <input
            type="radio"
            name="category"
            checked={selectedCategory === null}
            onChange={() => {
              setSelectedCategory(null);
              filterByCategory("all");
            }}
            className="form-radio text-lightGreen bg-gray-800 rounded-full focus:ring-lightGreen focus:ring-offset-gray-900 transition w-4 h-4"
          />
          <span className="hover:text-lightGreen transition-colors duration-200">
            Tất cả
          </span>
        </label>

        {/* Hiển thị danh mục */}
        {loading ? (
          <p className="text-gray-400 col-span-full text-center text-lg">
            ⏳ Đang tải danh mục...
          </p>
        ) : categories.length > 0 ? (
          categories.map((category) => (
            <label
              key={category.category_id}
              className="flex items-center space-x-2 cursor-pointer hover:text-lightGreen transition-colors duration-200 text-base md:text-lg"
            >
              <input
                type="radio"
                name="category"
                checked={selectedCategory === category.category_id}
                onChange={() => handleCategoryChange(category.category_id)}
                className="form-radio text-lightGreen bg-gray-800 rounded-full focus:ring-lightGreen focus:ring-offset-gray-900 transition w-4 h-4"
              />
              <span>{category.name}</span>
            </label>
          ))
        ) : (
          <p className="text-gray-400 col-span-full text-center text-lg">
            📂 Không có danh mục nào...
          </p>
        )}
      </div>
    </section>
  );
};

export default CategoryFilter;
