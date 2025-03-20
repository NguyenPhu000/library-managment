import API from "./api";

const loanService = {
  async getCurrentLoans(memberId) {
    try {
      const response = await API.get(`/loans/current/${memberId}`, {
        withCredentials: true,
      });
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi lấy danh sách loan:", error);
      throw new Error("Không thể lấy danh sách sách mượn.");
    }
  },
  async borrowBook(bookId, memberId) {
    try {
      const response = await API.post(
        `/loans/borrow`,
        { bookId, memberId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi mượn sách:", error);
      throw new Error("Không thể mượn sách.");
    }
  },
  async returnBook(loanId) {
    try {
      const response = await API.post(
        `/loans/return`,
        { loan_id: loanId },
        {
          withCredentials: true,
        }
      );
      return response.data;
    } catch (error) {
      console.error("❌ Lỗi khi trả sách:", error);
      throw new Error("Không thể trả sách.");
    }
  },
};

export default loanService;
