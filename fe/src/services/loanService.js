import API from "./api";

// Lấy danh sách lượt mượn
export const getAllLoans = async () => {
  try {
    const res = await API.get("/loans");
    return res.data;
  } catch (error) {
    console.error("Lỗi lấy danh sách mượn:", error);
    return [];
  }
};

// Mượn sách
export const borrowBook = async (member_id, book_id) => {
  try {
    const res = await API.post("/loans/borrow", { member_id, book_id });
    return res.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Lỗi!" };
  }
};

// Trả sách
export const returnBook = async (loan_id) => {
  try {
    const res = await API.post("/loans/return", { loan_id });
    return res.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Lỗi!" };
  }
};

// Yêu cầu gia hạn sách
export const requestRenew = async (loan_id) => {
  try {
    const res = await API.post("/loans/request-renew", { loan_id });
    return res.data;
  } catch (error) {
    return { success: false, message: error.response?.data?.message || "Lỗi!" };
  }
};

export default {
  getAllLoans,
  requestRenew,
  returnBook,
  borrowBook,
};
