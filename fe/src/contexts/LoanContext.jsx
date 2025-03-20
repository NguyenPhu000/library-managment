import React, { createContext, useState, useEffect, useContext } from "react";
import loanService from "../services/loanService";
import { useMemberId } from "./MemberContext";

export const LoanContext = createContext();

export const LoanProvider = ({ children }) => {
  const memberId = useMemberId();
  const [loans, setLoans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLoans = async () => {
      if (!memberId) {
        console.log("⏳ Chờ memberId...");
        return;
      }

      try {
        const data = await loanService.getCurrentLoans(memberId);
        setLoans(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchLoans();
  }, [memberId]);

  const extractLoanId = (loan) => {
    console.log("🔍 Loan:", loan.loan_id);
    return loan.loan_id; // Hàm tách loan_id
  };

  const returnLoan = async (loanId) => {
    try {
      console.log("📤 Gửi yêu cầu trả sách với loanId:", loanId);
      const result = await loanService.returnBook(loanId);

      if (result.success) {
        console.log("🎉 Trả sách thành công:", result.message);
        alert(result.message);

        // ✅ Cập nhật lại danh sách Loan (Xóa loan đã trả)
        setLoans((prevLoans) =>
          prevLoans.filter((loan) => loan.loan_id !== loanId)
        );
      } else {
        console.warn("⚠️ Lỗi khi trả sách:", result.message);
        alert(result.message);
      }
    } catch (err) {
      console.error("🚨 Lỗi khi trả sách:", err);
      setError(err.message);
      alert("Không thể trả sách.");
    }
  };

  return (
    <LoanContext.Provider value={{ loans, loading, error, returnLoan }}>
      {children}
    </LoanContext.Provider>
  );
};

export const useLoan = () => {
  const context = useContext(LoanContext);
  if (!context) {
    throw new Error("useLoan phải được sử dụng trong LoanProvider");
  }
  return context;
};
