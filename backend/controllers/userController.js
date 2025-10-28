import User from "../models/User.js";

// GET /api/users  -> admin only
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách user" });
  }
};

// DELETE /api/users/:id  -> admin or self-delete
export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    // nếu không phải admin và không phải chính chủ -> cấm
    if (req.user.role !== "admin" && req.user._id.toString() !== id) {
      return res.status(403).json({ message: "Không có quyền xóa user này!" });
    }

    const user = await User.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "User không tồn tại" });

    res.json({ message: "Xóa user thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi xóa user" });
  }
};
