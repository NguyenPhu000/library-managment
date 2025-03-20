import API from "./api";

export const getCurrentMemberInfo = async (userId) => {
  try {
    const { data } = await API.get(`/members/${userId}`);
    return data;
  } catch (error) {
    console.error("Lỗi khi lấy thông tin người dùng hiện tại:", error);
    throw error;
  }
};

export const getMemberIdByUserId = async (userId) => {
  try {
    const { data } = await API.get(`/members/member-id/${userId}`);
    return data.member_id;
  } catch (error) {
    console.error("Lỗi khi lấy member_id:", error);
    throw error;
  }
};
