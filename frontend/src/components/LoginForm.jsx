import React, { useState } from "react";
import axios from "axios";

export default function LoginForm() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [token, setToken] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost:5000/api/login", form);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      alert(err.response.data.message);
    }
  };

  return (
    <div>
      <h2>Đăng nhập</h2>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          placeholder="Mật khẩu"
          type="password"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button>Đăng nhập</button>
      </form>
      {token && <p>JWT Token: {token}</p>}
    </div>
  );
}
