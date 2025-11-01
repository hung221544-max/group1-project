import User from "../models/User.js";
import crypto from "crypto";
import sendEmail from "../utils/emailSender.js";

// Quên mật khẩu
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "Không tìm thấy người dùng" });

    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetPasswordExpire = Date.now() + 15 * 60 * 1000;

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpire = resetPasswordExpire;
    await user.save();

    const resetUrl = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
    const message = `<p>Nhấn vào link bên dưới để đặt lại mật khẩu (hết hạn sau 15 phút): <a href="${resetUrl}">${resetUrl}</a></p>`;
    await sendEmail(user.email, "Đặt lại mật khẩu", message);

    res.json({ message: "Email đặt lại mật khẩu đã được gửi!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};

// Đặt lại mật khẩu
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    const user = await User.findOne({ resetPasswordToken: token, resetPasswordExpire: { $gt: Date.now() } });
    if (!user) return res.status(400).json({ message: "Token không hợp lệ hoặc đã hết hạn" });

    user.password = password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    res.json({ message: "Đặt lại mật khẩu thành công!" });
  } catch (err) {
    res.status(500).json({ message: "Lỗi server", error: err.message });
  }
};
