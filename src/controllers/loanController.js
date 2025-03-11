import loanService from "../services/loanService";

let getAllLoans = async (req, res) => {
  try {
    let loans = await loanService.getAllLoans();

    res.render("loanPage", { dataTable: loans });
  } catch (error) {
    res.status(500).send("Lỗi khi lấy danh sách mượn sách: " + error.message);
  }
};

let borrowBook = async (req, res) => {
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

let returnBook = async (req, res) => {
  try {
    let result = await loanService.returnBook(req.body.loan_id);

    if (!result.success) {
      return res.status(400).json({ message: result.message });
    }

    res.status(200).json({ message: result.message, fine_amount: result.fine_amount });
  } catch (error) {
    res.status(500).json({ message: "Lỗi khi trả sách!", error: error.message });
  }
};

export default {
  getAllLoans,
  borrowBook,
  returnBook,
};
