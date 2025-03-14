import API from "./api";

const getCurrentUser = async () => {
  try {
    const response = await API.get("/me");
    // Backend cần có API này để trả về user
    return response.data.user;
  } catch (error) {
    return null;
  }
};
const logout = async () => {
  await API.get("/logout");
};

export default { getCurrentUser, logout };
