import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import profileRoutes from "./routes/profile.js";
import authRoutes from "./routes/auth.js";
console.log("✅ Auth routes loaded:", authRoutes);

dotenv.config();

const app = express();
app.use(cors());

// ❌ Nếu mày chưa có dòng này → thêm ngay bên dưới
app.use(express.json()); // ✅ Dòng cần thêm để server đọc JSON từ Postman

// Định nghĩa routes
app.use("/api", authRoutes);
app.use("/api/profile", profileRoutes);

// Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB kết nối thành công"))
  .catch((err) => console.error("❌ Lỗi kết nối MongoDB:", err));

// Khởi động server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
