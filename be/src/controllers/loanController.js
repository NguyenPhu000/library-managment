import loanService from "../services/loanService.js";

const getAllLoans = async (req, res) => {
  try {
    let loans = await loanService.getAllLoans();

    if (req.headers.accept?.includes("application/json")) {
      return res.json(loans);
    }
    res.render("loanPage", { dataTable: loans });
  } catch (error) {
    res
      .status(500)
      .json({ lỗi: "Không thể lấy danh sách mượn sách", error: error.message });
  }
};

const borrowBook = async (req, res) => {
  try {
    let result = await loanService.borrowBook(req.body);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res
      .status(201)
      .json({ message: "Mượn sách thành công!", loan: result.loan });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi mượn sách!", error: error.message });
  }
};

const returnBook = async (req, res) => {
  try {
    let result = await loanService.returnBook(req.body.loan_id);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res
      .status(200)
      .json({ message: result.message, fine_amount: result.fine_amount });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi trả sách!", error: error.message });
  }
};

//  Lấy danh sách loan chưa trả
const getCurrentLoans = async (req, res) => {
  try {
    const { memberId } = req.params; // Nhận memberId từ URL
    console.log("Lấy danh sách loan chưa trả cho member_id:", memberId);

    if (!memberId) {
      return res.status(400).json({ message: "Thiếu memberId!" });
    }

    let result = await loanService.getLoansByMemberId(memberId);

    if (!result.success) {
      return res.status(404).json({ message: result.message });
    }

    console.log(
      "API trả về danh sách loan chưa trả:",
      JSON.stringify(result.loans, null, 2)
    );
    res.status(200).json(result.loans);
  } catch (error) {
    console.error("Lỗi khi lấy danh sách loan:", error);
    res
      .status(500)
      .json({ message: "Lỗi khi lấy danh sách loan!", error: error.message });
  }
};

//  Yêu cầu gia hạn sách
const requestRenewLoan = async (req, res) => {
  try {
    let result = await loanService.requestRenewLoan(req.body.loan_id);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Lỗi khi yêu cầu gia hạn!", error: error.message });
  }
};

const approveRenewLoan = async (req, res) => {
  try {
    const { loan_id, action } = req.body; // action = "approve" hoặc "reject"
    let result = await loanService.approveRenewLoan(
      loan_id,
      action === "approve"
    );

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({ message: result.message });
  } catch (error) {
    res.status(500).json({
      message: "Lỗi khi xử lý yêu cầu gia hạn!",
      error: error.message,
    });
  }
};
export default {
  getAllLoans,
  borrowBook,
  returnBook,
  getCurrentLoans,
  requestRenewLoan,
  approveRenewLoan,
};
