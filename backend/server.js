// ===============================
// 🧩 IMPORT MODULES
// ===============================
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";

// ===============================
// 🧩 IMPORT ROUTES
// ===============================
import authRoutes from "./routes/auth.js";        // 🔐 Đăng ký, đăng nhập
import profileRoutes from "./routes/profile.js";  // 👤 Hồ sơ người dùng
import userRoutes from "./routes/user.js";        // 🧑‍💼 Quản lý user (Admin)
import adminRoutes from "./routes/admin.js";      // 🧠 Route quản lý hệ thống (Admin)

// ===============================
// ⚙️ CẤU HÌNH CƠ BẢN
// ===============================
dotenv.config();
const app = express();

// Cho phép nhận JSON từ client (Postman, frontend, v.v)
app.use(express.json());

// Cho phép request từ domain khác (frontend React, v.v)
app.use(cors());

// ===============================
// 🚏 ĐỊNH NGHĨA ROUTES CHÍNH
// ===============================
app.use("/api", authRoutes);              // 🔐 Đăng ký, đăng nhập
app.use("/api/profile", profileRoutes);   // 👤 Hồ sơ người dùng
app.use("/api/users", userRoutes);        // 🧑‍💼 Quản lý user (Admin)
app.use("/api/admin", adminRoutes);       // 🧠 API cho Admin

// ===============================
// ⚡ KẾT NỐI MONGODB
// ===============================
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB kết nối thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// ===============================
// 🚀 KHỞI ĐỘNG SERVER
// ===============================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
