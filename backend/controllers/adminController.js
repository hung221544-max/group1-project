import User from "../models/User.js";

// 📜 Lấy danh sách tất cả user
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password"); // ẩn password
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🗑️ Xóa user theo ID
export const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Xóa user thành công!" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 🛠️ Cập nhật quyền user (VD: user → admin)
export const updateUserRole = async (req, res) => {
  try {
    const { role } = req.body;
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { role },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
