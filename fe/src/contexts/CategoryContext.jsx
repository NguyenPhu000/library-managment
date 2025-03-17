import { createContext, useContext, useEffect, useState } from "react";
import categoryService from "../services/categoryService";

const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      const response = await categoryService.getCategories();

      if (response.categories.length > 0) {
        setCategories(response.categories);
      } else {
        console.warn("⚠ Không có danh mục nào được trả về từ API");
      }

      setLoading(false);
    };
    fetchCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, loading }}>
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => useContext(CategoryContext);
