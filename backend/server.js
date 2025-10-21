import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"; // 🟢 kiểm tra đúng đường dẫn nhé
import cors from "cors";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

// ✅ Kết nối MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB kết nối thành công"))
  .catch((err) => console.log("❌ Lỗi kết nối MongoDB:", err));

// ✅ Gắn route cho Auth
app.use("/api", authRoutes);

// ✅ Kiểm tra server
app.get("/", (req, res) => {
  res.send("Server đang chạy...");
});

app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
