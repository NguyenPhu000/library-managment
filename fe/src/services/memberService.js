import API from "./api";

export const getCurrentMemberInfo = async (userId) => {
  try {
    const { data } = await API.get(`/members/${userId}`);
    return data; // Trả về thông tin người dùng hiện tại
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng hiện tại:", error);
    throw error;
  }
};
