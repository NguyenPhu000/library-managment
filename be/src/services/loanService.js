import { Loan, Book, Member } from "../models";

//  Lấy danh sách tất cả lượt mượn
const getAllLoans = async () => {
  try {
    return await Loan.findAll({
      include: [
        { model: Member, attributes: ["member_code"] },
        { model: Book, attributes: ["title"] },
      ],
    });
  } catch (error) {
    throw new Error("Lỗi lấy danh sách mượn: " + error.message);
  }
};

//  Xử lý mượn sách
const borrowBook = async (member_id, book_id) => {
  try {
    const member = await Member.findByPk(member_id);
    if (!member)
      return { success: false, message: "Thành viên không tồn tại!" };

    //  Kiểm tra hạn thẻ thành viên
    if (new Date(member.expiry_date) < new Date()) {
      return { success: false, message: "Thẻ thành viên đã hết hạn!" };
    }

    const book = await Book.findByPk(book_id);
    if (!book || book.available_copies <= 0) {
      return { success: false, message: "Sách không có sẵn!" };
    }

    //  Kiểm tra số sách đang mượn
    const activeLoans = await Loan.count({
      where: { member_id, returned: false },
    });
    if (activeLoans >= member.max_loans) {
      return {
        success: false,
        message: "Bạn đã đạt giới hạn số sách có thể mượn!",
      };
    }

    //  Kiểm tra sách đã có người mượn chưa
    const existingLoan = await Loan.findOne({
      where: { book_id, returned: false },
    });
    if (existingLoan) {
      return { success: false, message: "Sách này đang được mượn!" };
    }

    //  Cập nhật số lượng sách trước khi mượn
    await book.decrement("available_copies");

    //  Tạo bản ghi mượn sách
    const newLoan = await Loan.create({
      member_id,
      book_id,
      loan_date: new Date(),
      due_date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000), // +14 ngày
      returned: false,
      fine_amount: 0,
    });

    return { success: true, loan: newLoan };
  } catch (error) {
    return { success: false, message: "Lỗi khi mượn sách: " + error.message };
  }
};

//  Xử lý trả sách
const returnBook = async (loan_id) => {
  try {
    const loan = await Loan.findOne({ where: { loan_id, returned: false } });
    if (!loan) {
      return {
        success: false,
        message: "Sách đã được trả hoặc không tìm thấy!",
      };
    }

    //  Tính tiền phạt nếu trả trễ
    const today = new Date();
    let fine_amount = 0;

    if (today > loan.due_date) {
      fine_amount =
        Math.ceil((today - loan.due_date) / (1000 * 60 * 60 * 24)) * 5000;
    }

    //  Cập nhật trạng thái trả sách
    await loan.update({ returned: true, return_date: today, fine_amount });

    //  Tăng lại số lượng sách có sẵn
    await Book.increment("available_copies", {
      where: { book_id: loan.book_id },
    });

    return { success: true, message: "Sách đã được trả!", fine_amount };
  } catch (error) {
    return { success: false, message: "Lỗi khi trả sách: " + error.message };
  }
};

const getLoanByBookId = async (bookId) => {
  try {
    const loan = await Loan.findOne({
      where: { book_id: bookId, returned: false },
      attributes: ["loan_id", "due_date", "renewal_status", "renew_count"],
    });

    if (!loan)
      return { success: false, message: "Không tìm thấy thông tin mượn sách!" };

    return { success: true, loan };
  } catch (error) {
    throw new Error("Lỗi khi lấy thông tin mượn sách: " + error.message);
  }
};

// Lấy danh sách khoản vay hiện tại cho thành viên
const getLoansByMemberId = async (member_id) => {
  try {
    const loans = await Loan.findAll({
      where: { member_id, returned: false }, // Chỉ lấy sách chưa trả
      include: [
        { model: Book, attributes: ["title", "author"] }, // Lấy thông tin sách
        { model: Member, attributes: ["member_code"] }, // Lấy mã thành viên
      ],
      attributes: [
        "loan_id",
        "loan_date",
        "due_date",
        "fine_amount",
        "renew_count",
        "renewal_status",
      ],
      order: [["loan_date", "DESC"]], // Sắp xếp theo ngày mượn mới nhất
    });

    return { success: true, loans };
  } catch (error) {
    return {
      success: false,
      message: "Lỗi khi lấy danh sách loan!",
      error: error.message,
    };
  }
};

//  Yêu cầu gia hạn sách
const requestRenewLoan = async (loan_id) => {
  try {
    const loan = await Loan.findByPk(loan_id);
    if (!loan) return { success: false, message: "Không tìm thấy lượt mượn!" };

    if (loan.returned) {
      return {
        success: false,
        message: "Sách đã được trả, không thể gia hạn!",
      };
    }

    if (loan.renew_count >= 2) {
      return { success: false, message: "Bạn đã gia hạn tối đa 2 lần!" };
    }

    await loan.update({ renewal_status: "pending" });

    return {
      success: true,
      message: "Yêu cầu gia hạn đã được gửi, vui lòng đợi xác nhận!",
    };
  } catch (error) {
    return {
      success: false,
      message: "Lỗi khi yêu cầu gia hạn: " + error.message,
    };
  }
};

//  Phê duyệt gia hạn sách
const approveRenewLoan = async (loan_id, approve = true) => {
  try {
    const loan = await Loan.findByPk(loan_id);
    if (!loan) return { success: false, message: "Không tìm thấy lượt mượn!" };

    if (approve) {
      if (loan.renew_count >= 2) {
        return { success: false, message: "Không thể gia hạn, đã đạt tối đa!" };
      }

      await loan.update({
        due_date: new Date(loan.due_date.getTime() + 14 * 24 * 60 * 60 * 1000), // +14 ngày
        renew_count: loan.renew_count + 1,
        renewal_status: "approved",
      });

      return { success: true, message: "Gia hạn thành công, thêm 14 ngày!" };
    } else {
      await loan.update({ renewal_status: "rejected" });

      return { success: false, message: "Yêu cầu gia hạn đã bị từ chối!" };
    }
  } catch (error) {
    return {
      success: false,
      message: "Lỗi khi xử lý gia hạn: " + error.message,
    };
  }
};

export default {
  getAllLoans,
  borrowBook,
  returnBook,
  getLoanByBookId,
  getLoansByMemberId,
  requestRenewLoan,
  approveRenewLoan,
};
