import React, { useState } from "react";
import axios from "axios";
// 1. Chỉ cần 'useNavigate' (không cần Link ở đây)
import { useNavigate } from "react-router-dom";

// 2. NHẬN PROPS: 'onSwitchToLogin'
export default function SignupForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate(); // Giữ lại navigate phòng khi cần

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/signup", form);
      setMessage("✅ " + (res.data.message || "Đăng ký thành công!"));
      setForm({ name: "", email: "", password: "" });
      
      // 3. Tự động chuyển tab sang Login sau 1.5s
      setTimeout(() => onSwitchToLogin(), 1500);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Đăng ký thất bại!"));
    }
  };

  return (
    // 4. BỎ <div.auth-container> VÀ <nav>
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ và tên"
          className="auth-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="auth-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="auth-input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className="auth-button">
          Đăng ký ngay
        </button>
      </form>

      {message && (
        <p
          className="auth-message"
          style={{
            color: message.startsWith("✅") ? "green" : "red",
          }}
        >
          {message}
        </p>
      )}

      <p className="signup-link">
        Bạn đã có tài khoản?
        {/* 5. Sửa Link -> Dùng <a> với onClick từ props */}
        <a onClick={onSwitchToLogin}>
          Đăng nhập ngay
        </a>
      </p>
    </div>
  );
}
