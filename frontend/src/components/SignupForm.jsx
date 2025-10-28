import React, { useState } from "react";
import axios from "axios";

export default function SignupForm({ onSwitchToLogin }) {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/signup", form);
      setMessage("✅ " + (res.data.message || "Đăng ký thành công!"));
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Đăng ký thất bại!"));
    }
  };

  return (
    <div className="signup-container">
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Họ và tên"
          className="signup-input"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          required
        />
        <input
          type="password"
          placeholder="Mật khẩu"
          className="signup-input"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
          required
        />

        <button type="submit" className="signup-btn-main">
          Đăng ký ngay
        </button>

        <button
          type="button"
          className="login-switch-btn"
          onClick={onSwitchToLogin}
        >
          Quay lại đăng nhập
        </button>
      </form>

      {message && (
        <p
          style={{
            marginTop: "16px",
            color: message.startsWith("✅") ? "green" : "red",
            fontWeight: "500",
          }}
        >
          {message}
        </p>
      )}
    </div>
  );
}
