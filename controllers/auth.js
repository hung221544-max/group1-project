import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Đăng ký
export const signup = async (req, res) => {
  try {
    const { name, email, password, isAdmin } = req.body; // thêm isAdmin

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "Email đã được đăng ký" });

    const newUser = await User.create({ name, email, password, isAdmin: isAdmin || false });

    res.status(201).json({
      message: "Đăng ký thành công",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        isAdmin: newUser.isAdmin
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};



// Đăng nhập
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Mật khẩu không hợp lệ" });

    const token = jwt.sign({ id: user._id, isAdmin: user.isAdmin }, process.env.JWT_SECRET, { expiresIn: "1d" });

    res.json({
      message: "Đăng nhập thành công",
      token,
      user: { id: user._id, name: user.name, email: user.email, isAdmin: user.isAdmin }
    });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Đăng xuất
export const logout = async (req, res) => {
  res.status(200).json({ message: "Đăng xuất thành công" });
};
