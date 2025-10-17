const express = require('express');
const app = express();
app.use(express.json());

// 🔹 Import route user
const userRoutes = require('./routes/user');

// 🔹 Kết nối route vào app
app.use('/', userRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server đang chạy tại http://localhost:${PORT}`));
