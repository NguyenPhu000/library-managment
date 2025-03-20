import React, { useContext } from "react";
import { LoanContext } from "../contexts/LoanContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook, faRedo, faReply } from "@fortawesome/free-solid-svg-icons";

const LoanPage = () => {
  const { loans, loading, error, returnLoan } = useContext(LoanContext);

  const handleReturnBook = async (loanId, title) => {
    if (!window.confirm(`Bạn có chắc chắn muốn trả sách "${title}" không?`))
      return;

    try {
      await returnLoan(loanId);
      alert(`Đã trả sách: "${title}"`);
    } catch (error) {
      alert(`Lỗi khi trả sách: ${error.message}`);
    }
  };

  const handleRenewBook = (title) => {
    alert(`Yêu cầu gia hạn sách "${title}" đã được gửi!`);
  };

  if (loading)
    return (
      <div className="font-poppins p-4 bg-gray-900 text-white">Đang tải...</div>
    );
  if (error)
    return (
      <div className="font-poppins p-4 bg-gray-900 text-white">
        Lỗi: {error}
      </div>
    );

  return (
    <div className="font-poppins p-4 bg-gray-900 text-white">
      <h1 className="text-lightGreen mb-4 text-2xl font-bold">
        Danh Sách Sách Đang Mượn
      </h1>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-700 rounded-md shadow-md bg-gray-800">
          <thead className="bg-gray-700">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-lightGreen uppercase tracking-wider">
                <FontAwesomeIcon icon={faBook} /> Tiêu đề sách
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lightGreen uppercase tracking-wider">
                Tác giả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lightGreen uppercase tracking-wider">
                Ngày mượn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lightGreen uppercase tracking-wider">
                Hạn trả
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lightGreen uppercase tracking-wider">
                Số lần gia hạn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lightGreen uppercase tracking-wider">
                Trạng thái gia hạn
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-lightGreen uppercase tracking-wider">
                Hành động
              </th>
            </tr>
          </thead>
          <tbody className="bg-gray-800 divide-y divide-gray-700">
            {loans.length > 0 ? (
              loans.map((loan) => (
                <tr
                  key={loan.loan_id}
                  className="hover:bg-gray-600 transition-colors duration-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    {loan.Book.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {loan.Book.author}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(loan.loan_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(loan.due_date).toLocaleDateString("en-GB")}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {loan.renew_count}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {loan.renewal_status === "pending"
                      ? "Đang chờ"
                      : loan.renewal_status === "approved"
                      ? "Đã chấp nhận"
                      : loan.renewal_status === "reject"
                      ? "Từ chối"
                      : "Đang chờ"}{" "}
                    {/* Trạng thái gia hạn */}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap space-x-2">
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                      type="button"
                      onClick={() =>
                        handleReturnBook(loan.loan_id, loan.Book.title)
                      }
                      disabled={loan.returned === 1}
                    >
                      <FontAwesomeIcon icon={faReply} /> Trả sách
                    </button>
                    <button
                      className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded focus:outline-none"
                      type="button"
                      onClick={() => handleRenewBook(loan.Book.title)}
                    >
                      <FontAwesomeIcon icon={faRedo} /> Gia hạn
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center">
                  Không có sách đang mượn nào.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LoanPage;
