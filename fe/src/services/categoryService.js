import API from "./api";

const getCategories = async () => {
  try {
    console.log("🔍 Đang gọi API /api/category...");

    const response = await API.get("/category");

    console.log("📌 Dữ liệu từ API:", response.data);

    if (!response.data || !Array.isArray(response.data)) {
      return { categories: [] };
    }

    return { categories: response.data };
  } catch (error) {
    console.error("❌ API Error:", error);
    return { categories: [] };
  }
};

export default { getCategories };
