import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import User from "../models/User.js";

dotenv.config();

// 🛡️ Xác thực token
export const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Không có token hoặc token không hợp lệ!" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "mysecret");

    // ✅ Đồng bộ với token trong login (dùng "id")
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(404).json({ message: "Không tìm thấy người dùng!" });
    }

    req.user = user;
    next();
  } catch (err) {
    console.error("❌ verifyToken error:", err);
    res.status(401).json({ message: "Token không hợp lệ hoặc đã hết hạn!" });
  }
};

// 👑 Chỉ cho phép admin
export const verifyAdmin = (req, res, next) => {
  if (!req.user) {
    return res.status(401).json({ message: "Chưa xác thực người dùng!" });
  }

  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Chỉ admin mới có quyền truy cập!" });
  }

  next();
};
