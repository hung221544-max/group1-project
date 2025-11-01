import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import User from "../models/User.js";

const router = express.Router();

/**
 * 🧑‍💼 [GET] /api/users
 * → Chỉ admin mới được xem danh sách user
 */
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const users = await User.find().select("-password"); // bỏ mật khẩu khi trả về
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi lấy danh sách user" });
  }
});

/**
 * 🗑️ [DELETE] /api/users/:id
 * → Admin có thể xóa user
 */
router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ message: "Không tìm thấy user để xóa!" });

    res.status(200).json({ message: "Xóa user thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server khi xóa user" });
  }
});

export default router;
