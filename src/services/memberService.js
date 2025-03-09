import { Member, User, Loan } from "../models";

// Lấy tất cả member
let getAllMembers = async () => {
  try {
    let members = await Member.findAll({
      include: [{ model: User, attributes: ["username"] }],
    });
    return members;
  } catch (error) {
    throw new Error("Lỗi lấy danh sách Member: " + error.message);
  }
};

// Đồng bộ Member từ User (nếu chưa có)
let syncMembersFromUsers = async () => {
  try {
    let users = await User.findAll({ where: { role: "member" } }); // Lấy tất cả user

    let existingMembers = await Member.findAll({ attributes: ["user_id"] });
    let existingUserIds = existingMembers.map((m) => m.user_id);

    let newMembers = users
      .filter((user) => !existingUserIds.includes(user.user_id))
      .map((user) => ({
        user_id: user.user_id,
        member_code: `MEM-${user.user_id}`,
        join_date: new Date(),
        expiry_date: new Date(
          new Date().setFullYear(new Date().getFullYear() + 1)
        ),
        max_loans: 5,
        current_loans: 0,
        status: "Active",
      }));

    if (newMembers.length > 0) {
      await Member.bulkCreate(newMembers);
    }

    return { message: `${newMembers.length} Members được thêm thành công!` };
  } catch (error) {
    throw new Error("Lỗi đồng bộ Members từ Users: " + error.message);
  }
};

// Cập nhật Member
let updateMember = async (data) => {
  try {
    let member = await Member.findByPk(data.member_id);
    if (!member) throw new Error("Không tìm thấy Member");

    let user = await User.findByPk(member.user_id);
    if (!user || user.role !== "member")
      throw new Error("User này không phải Member");

    await member.update({
      expiry_date: data.expiry_date,
      max_loans: data.max_loans,
      current_loans: data.current_loans,
      status: data.status,
    });

    return { message: "Cập nhật Member thành công!" };
  } catch (error) {
    throw new Error("Lỗi update Member: " + error.message);
  }
};

// Xóa Member
let deleteMemberById = async (member_id) => {
  try {
    const member = await Member.findByPk(member_id);
    if (!member) throw new Error("Không tìm thấy Member");

    await member.destroy();
    return { message: "Xóa Member thành công" };
  } catch (error) {
    throw new Error("Lỗi xóa Member: " + error.message);
  }
};

export default {
  getAllMembers,
  syncMembersFromUsers,
  updateMember,
  deleteMemberById,
};
