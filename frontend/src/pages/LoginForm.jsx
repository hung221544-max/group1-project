import React, { useState } from "react";
import axios from "axios";
// 1. Chỉ cần 'Link' và 'useNavigate'
import { Link, useNavigate } from "react-router-dom";

// 2. NHẬN PROPS: 'onSwitchToSignup'
export default function LoginForm({ onSwitchToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", form);
      setMessage("✅ " + (res.data.message || "Đăng nhập thành công!"));

      // 3. LƯU TOKEN (Quan trọng)
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }

      setTimeout(() => navigate("/profile"), 1000);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Đăng nhập thất bại!"));
    }
  };

  return (
    // 4. BỎ <div.auth-container> VÀ <nav>
    // Chỉ return nội dung của form
    <div>
      {/* Chúng ta không cần <h2 className="auth-title"> vì tab đã
        đóng vai trò là tiêu đề.
      */}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email hoặc tên đăng nhập"
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

        <div className="options">
          <label htmlFor="remember" className="remember-me">
            <input type="checkbox" id="remember" name="remember" />
            Ghi nhớ tôi
          </label>
          <Link to="/forgot-password" className="forgot-password">
            Quên mật khẩu?
          </Link>
        </div>

        <button type="submit" className="auth-button">
          Đăng nhập ngay
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
        Bạn chưa có tài khoản?
        {/* 5. Sửa Link -> Dùng <a> với onClick từ props */}
        <a onClick={onSwitchToSignup}>
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}
