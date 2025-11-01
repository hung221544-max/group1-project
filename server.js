import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url"; // ✅ Dành cho ES Modules

// ---------------------- Đường dẫn tuyệt đối ---------------------- //
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ---------------------- Cấu hình môi trường ---------------------- //
dotenv.config();

// ---------------------- Import routes ---------------------- //
import passwordRoutes from "./routes/passwordRoutes.js"; // /forgot-password, /reset-password
import userRoutes from "./routes/user.js";               // user routes
import profileRoutes from "./routes/profileRoutes.js";   // profile routes
import authRoutes from "./routes/auth.js";               // auth routes
// ---------------------- Khởi tạo app ---------------------- //
const app = express();

// ---------------------- Middleware ---------------------- //
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cho phép truy cập file tĩnh (upload avatar, v.v.)
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ---------------------- ROUTES ---------------------- //
app.use("/api/password", passwordRoutes);   // ✅ đổi thành /api/password để route rõ ràng hơn
app.use("/api/users", userRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/auth", authRoutes);
// ---------------------------------------------------- //

// ---------------------- Kết nối MongoDB ---------------------- //
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ---------------------- Trang mặc định ---------------------- //
app.get("/", (req, res) => {
  res.send("🚀 Server is running successfully!");
});

// ---------------------- PORT ---------------------- //
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🔥 Server running on http://localhost:${PORT}`);
});
