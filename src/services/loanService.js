import { Loan, Book, Member } from "../models";

const getAllLoans = async () => {
  try {
    const loans = await Loan.findAll({
      include: [
        { model: Member, attributes: ["member_code"] },
        { model: Book, attributes: ["title"] },
      ],
    });
    return loans;
  } catch (error) {
    throw new Error("Lỗi load danh sách mượn: " + error.message);
  }
};

let borrowBook = async (member_id, book_id) => {
  try {
    let member = await Member.findByPk(member_id);
    if (!member)
      return { success: false, message: "Thành viên không tồn tại!" };

    let book = await Book.findByPk(book_id);
    if (!book) return { success: false, message: "Sách không tồn tại!" };

    let activeLoans = await Loan.count({ where: member_id, returned: false });

    if (activeLoans >= member.max_loans) {
      return {
        success: false,
        message: "Bạn đã đạt giới hạn số sách có thể mượn!",
      };
    }

    let existingLoan = await Loan.findOne({
      where: { book_id, returned: false },
    });

    if (existingLoan) {
      return {
        success: false,
        message: "Sách này đang được mượn, vui lòng chọn sách khác!",
      };
    }
    let newLoan = await Loan.create({
      member_id,
      book_id,
      loan_date: new Date(),
      due_date: new Date(new Date().setDate(new Date().getDate() + 14)),
      returned: false,
      fine_amount: 0,
    });

    return { success: true, loan: newLoan };
  } catch (error) {
    throw new Error("Lỗi khi mượn sách: " + error.message);
  }
};

let returnBook = async (loan_id) => {
  try {
    let loan = await Loan.findOne({ where: { loan_id, returned: false } });

    if (!loan) {
      return {
        success: false,
        message: "Không tìm thấy thông tin mượn hoặc sách đã được trả!",
      };
    }

    let today = new Date();
    let fine_amount = 0;

    if (today > loan.due_date) {
      let daysLate = Math.ceil((today - loan.due_date) / (1000 * 60 * 60 * 24));
      fine_amount = daysLate * 5000; // 5,000 VND/ngày trễ
    }

    await Loan.update(
      { returned: true, return_date: today, fine_amount },
      { where: { loan_id } }
    );

    return { success: true, message: "Sách đã được trả!", fine_amount };
  } catch (error) {
    throw new Error("Lỗi khi trả sách: " + error.message);
  }
};
export default {
  getAllLoans,
  borrowBook,
  returnBook,
};
