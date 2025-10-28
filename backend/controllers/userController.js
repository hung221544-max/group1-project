import User from "../models/User.js";

// ✅ Lấy danh sách toàn bộ user (chỉ Admin)
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // ẩn password
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách user!" });
  }
};

// ✅ Xóa user theo ID
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // Nếu không phải admin → chỉ được xóa chính mình
    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Không có quyền xóa user này!" });
    }

    const deleted = await User.findByIdAndDelete(id);
    if (!deleted) return res.status(404).json({ message: "User không tồn tại!" });

    res.json({ message: "Xóa user thành công!" });
  } catch (error) {
    res.status(500).json({ message: "Lỗi server khi xóa user!" });
  }
};
