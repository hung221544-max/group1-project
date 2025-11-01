import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Nhận props 'onSwitchToSignup' từ component cha (AuthPage)
export default function LoginForm({ onSwitchToSignup }) {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 1. GỌI API LOGIN
      const res = await axios.post("http://localhost:3000/api/login", form);
      setMessage("✅ " + (res.data.message || "Đăng nhập thành công!"));

      // 2. LẤY DỮ LIỆU TỪ RESPONSE
      // (Backend của bạn trả về { token, user: { ... } } )
      const { token, user } = res.data;

      // 3. LƯU CẢ TOKEN VÀ ROLE (PHẦN SỬA QUAN TRỌNG)
      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("role", user.role); // <-- DÒNG NÀY ĐÃ ĐƯỢC THÊM
      }

      // 4. CHUYỂN HƯỚNG DỰA TRÊN ROLE (PHẦN SỬA QUAN TRỌNG)
      setTimeout(() => {
        if (user.role === 'admin') {
          navigate('/admin/users'); // Admin -> Trang quản lý
        } else {
          navigate('/profile'); // User -> Trang hồ sơ
        }
      }, 1000); // Chuyển hướng sau 1 giây

    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Đăng nhập thất bại!"));
    }
  };

  // Phần JSX giữ nguyên như của bạn
  return (
    <div>
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
        <a onClick={onSwitchToSignup}>
          Đăng ký ngay
        </a>
      </p>
    </div>
  );
}