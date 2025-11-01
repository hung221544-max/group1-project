import User from "../models/User.js";

// Lấy danh sách user (chỉ admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách người dùng" });
  }
};

// Xóa user (admin hoặc chính chủ)
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.user.isAdmin && req.user.id !== id)
      return res.status(403).json({ message: "Không có quyền xóa người dùng này" });

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Người dùng không tồn tại" });

    res.json({ message: "Xóa người dùng thành công" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi xóa người dùng" });
  }
};
