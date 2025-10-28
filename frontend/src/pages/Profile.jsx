import React, { useEffect, useState } from "react";
import axios from "axios";
// 1. Import 'useNavigate'
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const token = localStorage.getItem("token");
  const navigate = useNavigate(); // Khởi tạo navigate

  useEffect(() => {
    // 2. Kiểm tra token
    if (!token) {
      navigate("/auth"); // Chuyển về trang /auth (tab login/signup)
      return;
    }
    axios
      .get("http://localhost:3000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        setFormData(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // 3. Nếu token hết hạn (lỗi 401) -> Xóa token và đá về /auth
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          navigate("/auth");
        } else {
          setMessage("❌ Lỗi khi tải thông tin người dùng!");
        }
        setLoading(false);
      });
  }, [token, navigate]); // Thêm dependency

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put("http://localhost:3000/api/profile", formData, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setMessage("✅ Cập nhật thông tin thành công!"))
      .catch(() => setMessage("❌ Lỗi khi cập nhật!"));
  };

  // 4. Thêm hàm Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    setMessage("✅ Đăng xuất thành công!");
    setTimeout(() => navigate("/auth"), 1000); // Về trang /auth
  };

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Đang tải...</p>;

  return (
    // 5. BỎ <nav>
    // GIỮ <div.auth-container> để có nền xám và padding
    <div className="auth-container">
      <div className="auth-form-box">
        <h2 className="auth-title">Thông tin cá nhân</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Họ và tên"
            className="auth-input"
          />
          <input
            type="email"
            name="email"
            value={formData.email || ""}
            onChange={handleChange}
            placeholder="Email"
            className="auth-input"
          />
          <button type="submit" className="auth-button">
            Cập nhật thông tin
          </button>
        </form>

        {/* 6. Thêm nút Đăng xuất */}
        {/*<button
          type="button"
          className="auth-button logout-button"
          onClick={handleLogout}
        >
          Đăng xuất
        </button>*/}

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
      </div>
    </div>
  );
};

export default Profile;
