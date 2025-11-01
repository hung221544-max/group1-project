import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// ⚙️ Cấu hình Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// 📦 Cấu hình multer lưu trực tiếp lên Cloudinary
const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "avatars", // thư mục Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
    public_id: (req, file) => `${Date.now()}-${file.originalname}`,
  },
});

const upload = multer({ storage });

// ✅ Controller upload avatar
export const uploadAvatar = async (req, res) => {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Không có file được upload" });
    }

    // Cập nhật avatarUrl vào DB (nếu có bảng User)
    const userId = req.user?.id;
    let updatedUser = null;

    if (userId) {
      updatedUser = await User.findByIdAndUpdate(
        userId,
        { avatarUrl: req.file.path },
        { new: true }
      ).select("-password");
    }

    res.status(200).json({
      message: "Upload avatar thành công!",
      imageUrl: req.file.path,
      user: updatedUser,
    });
  } catch (error) {
    console.error("❌ Upload lỗi:", error);
    res.status(500).json({ message: "Lỗi khi upload avatar", error });
  }
};

// Middleware upload 1 file
export const uploadAvatarMiddleware = upload.single("avatar");
