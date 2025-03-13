import memberService from "../services/memberService.js";

const getDisplayMember = async (req, res) => {
  try {
    let data = await memberService.getAllMembers();

    if (req.headers.accept?.includes("application/json")) {
      return res.json(data);
    }

    res.render("memberPage", { dataTable: data });
  } catch (error) {
    res.status(500).json({ lỗi: error.message });
  }
};

const updateMember = async (req, res) => {
  try {
    await memberService.updateMember(req.body);
    let updatedData = await memberService.getAllMembers();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Cập nhật thành công!" });
    }

    res.render("memberPage", { dataTable: updatedData });
  } catch (error) {
    res.status(500).json({ lỗi: error.message });
  }
};

const deleteMember = async (req, res) => {
  try {
    if (!req.query.id)
      return res.status(400).json({ lỗi: "Thiếu ID thành viên" });

    await memberService.deleteMemberById(req.query.id);
    const data = await memberService.getAllMembers();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Xóa thành công!" });
    }

    res.render("memberPage", { dataTable: data });
  } catch (error) {
    res.status(500).json({ lỗi: error.message });
  }
};

const syncMember = async (req, res) => {
  try {
    await memberService.syncMembersFromUsers();
    let data = await memberService.getAllMembers();

    if (req.headers.accept?.includes("application/json")) {
      return res.json({ message: "Đồng bộ thành công!" });
    }

    res.render("memberPage", { dataTable: data });
  } catch (error) {
    res.status(500).json({ lỗi: error.message });
  }
};

export default { getDisplayMember, updateMember, deleteMember, syncMember };
