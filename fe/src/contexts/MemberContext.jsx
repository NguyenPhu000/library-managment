import { createContext, useContext, useEffect, useState } from "react";
import { getCurrentMemberInfo } from "../services/memberService";
import { useAuth } from "./AuthContext";

const MemberContext = createContext();

export const MemberProvider = ({ children }) => {
  const [memberData, setMemberData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchCurrentMember = async () => {
      if (!user || !user.user_id) {
        setError(
          "Người dùng chưa được xác thực hoặc ID người dùng không tồn tại"
        );
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);
      try {
        const member = await getCurrentMemberInfo(user.user_id);
        setMemberData(member);
      } catch (error) {
        console.error("Lỗi khi tìm nạp thông tin thành viên hiện tại:", error);
        setError("Không thể tải thông tin thành viên");
        setMemberData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCurrentMember();
  }, [user]);

  return (
    <MemberContext.Provider value={{ memberData, loading, error }}>
      {children}
    </MemberContext.Provider>
  );
};

export const useMember = () => {
  const context = useContext(MemberContext);
  if (!context) {
    throw new Error("useMember phải được sử dụng trong MemberProvider");
  }
  return context;
};

export default MemberProvider;
