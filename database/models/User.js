const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// Định nghĩa schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {   // thêm trường password
    type: String,
    required: true
  },
  role: {       // thêm role: mặc định là 'user'
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  }
});

// Mã hóa mật khẩu trước khi lưu
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model('User', userSchema);
module.exports = User;
