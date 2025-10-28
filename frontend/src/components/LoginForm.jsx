import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:3000/api/login", form);
      setMessage("✅ " + (res.data.message || "Đăng nhập thành công!"));
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Đăng nhập thất bại!"));
    }
  };

  return (
    <div className="auth-form-box">
      <h2 className="auth-title">Đăng nhập</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Email hoặc thông tin đăng nhập tên"
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
          Đăng Nhập Ngay
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
