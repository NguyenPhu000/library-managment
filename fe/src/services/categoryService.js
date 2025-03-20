import API from "./api";

const getCategories = async () => {
  try {
    const response = await API.get("/category");

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
