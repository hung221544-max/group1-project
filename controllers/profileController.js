import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudinary.js";
import User from "../models/User.js";

// ✅ Cấu hình multer để lưu trực tiếp lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars",
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// ✅ Middleware upload 1 file (gắn vào route)
export const uploadAvatarMiddleware = upload.single("avatar");

// ✅ Controller xử lý lưu URL vào DB
export const uploadAvatar = async (req, res) => {
  try {
    // Kiểm tra xem file đã upload thành công chưa
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Không có file được tải lên" });
    }

    // Cập nhật avatar vào database
    const userId = req.user.id; // req.user được gắn trong verifyToken
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { avatarUrl: req.file.path },
      { new: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "Không tìm thấy người dùng" });
    }

    res.status(200).json({
      message: "Upload avatar thành công!",
      imageUrl: req.file.path,
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Lỗi upload avatar:", error);
    res.status(500).json({
      message: "Lỗi khi upload avatar",
      error: error.message,
    });
  }
};
