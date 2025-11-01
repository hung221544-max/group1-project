import React, { useState } from "react";
import axios from "axios";

function AddUser({ onUserAdded }) {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const validate = () => {
    if (!formData.name.trim()) return "⚠️ Vui lòng nhập tên.";
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return "⚠️ Email không hợp lệ.";
    return "";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validate();
    if (validationError) return setError(validationError);

    try {
      setLoading(true);
      setError("");
      const res = await axios.post("http://localhost:3000/users", formData);
      alert("✅ Thêm user thành công!");
      setFormData({ name: "", email: "" });
      onUserAdded?.(res.data); // Gọi callback để cập nhật danh sách
    } catch (err) {
      setError("❌ Lỗi khi thêm user!");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card">
      <h2>Thêm người dùng</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Tên"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        />
        {error && <p className="error">{error}</p>}
        <button type="submit" disabled={loading}>
          {loading ? "Đang thêm..." : "Thêm"}
        </button>
      </form>
    </div>
  );
}

export default AddUser;
