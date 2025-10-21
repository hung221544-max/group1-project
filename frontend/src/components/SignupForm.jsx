import React, { useState } from "react";
import axios from "axios";

export default function SignupForm() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/signup", form);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Đăng ký</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Họ tên"
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Mật khẩu"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Đăng ký</button>
      </form>
      <p>{message}</p>
    </div>
  );
}