const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');
const app = express();

app.use(express.json());

// 🔗 Kết nối MongoDB Atlas
mongoose.connect('mongodb+srv://hung221544:FHxxwGEQaQIt9Lfo@cluster0.eq8r7zk.mongodb.net/groupDB?retryWrites=true&w=majority&appName=Cluster0', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.log('❌ Connection error:', err));

// 📥 POST: Đăng ký user mới
app.post('/signup', async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // kiểm tra trùng email
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email đã tồn tại!' });
    }

    // tạo user mới
    const newUser = new User({ name, email, password, role });
    await newUser.save();

    res.status(201).json({
      message: 'Tạo tài khoản thành công!',
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role
      }
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// 📤 GET: Xem danh sách user (dành cho test)
app.get('/users', async (req, res) => {
  try {
    const users = await User.find().select('-password'); // ẩn mật khẩu
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.listen(3000, () => console.log('🚀 Server is running on port 3000'));
