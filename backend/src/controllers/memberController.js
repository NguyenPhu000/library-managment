import memberService from "../services/memberService";

let getDisplayMember = async (req, res) => {
  try {
    let data = await memberService.getAllMembers();
    res.render("memberPage", { dataTable: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let updateMember = async (req, res) => {
  try {
    await memberService.updateMember(req.body);
    let updatedData = await memberService.getAllMembers();
    return res.render("memberPage", { dataTable: updatedData });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

const deleteMember = async (req, res) => {
  try {
    if (!req.query.id) return res.status(400).send("Member ID is required");

    await memberService.deleteMemberById(req.query.id);
    const data = await memberService.getAllMembers();
    return res.render("memberPage", { dataTable: data });
  } catch (error) {
    res.status(500).send(error.message);
  }
};

let syncMember = async (req, res) => {
  try {
    await memberService.syncMembersFromUsers();
    let data = await memberService.getAllMembers(); // Lấy danh sách mới
    res.render("memberPage", { dataTable: data });
  } catch (error) {
    res.status(500).send("Lỗi server: " + error.message);
  }
};

export default {
  getDisplayMember,
  updateMember,
  deleteMember,
  syncMember,
};
