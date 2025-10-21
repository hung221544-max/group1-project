require('dotenv').config(); // ⚠️ dòng này luôn nằm đầu tiên!

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Thử in ra xem biến MONGO_URI có giá trị không
console.log("🧭 MONGO_URI =", process.env.MONGO_URI);

// ✅ Kết nối MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB kết nối thành công"))
  .catch(err => console.error("❌ MongoDB kết nối bị lỗi:", err));

const userRoutes = require('./routes/user');
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
