import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// 1. Thêm ảnh avatar mặc định
const DEFAULT_AVATAR = "https://i.imgur.com/6VBx3io.png"; // Placeholder

const Profile = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    avatarUrl: DEFAULT_AVATAR // Khởi tạo giá trị
  });
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  // 2. Thêm state cho việc tải ảnh
  const [uploading, setUploading] = useState(false);
  
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate("/auth"); 
      return;
    }
    axios
      .get("http://localhost:3000/api/profile", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        // 3. Gán dữ liệu (bao gồm cả avatarUrl)
        setFormData({
          name: res.data.name || "",
          email: res.data.email || "",
          avatarUrl: res.data.avatarUrl || DEFAULT_AVATAR // Cập nhật avatar
        });
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem("token");
          localStorage.removeItem("role"); // Cũng nên xóa role
          navigate("/auth");
        } else {
          setMessage("❌ Lỗi khi tải thông tin người dùng!");
        }
        setLoading(false);
      });
  }, [token, navigate]);

  // Hàm xử lý cập nhật (Họ tên, Email)
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Chỉ gửi name và email
    const dataToUpdate = { name: formData.name, email: formData.email }; 
    axios
      .put("http://localhost:3000/api/profile", dataToUpdate, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => setMessage("✅ Cập nhật thông tin thành công!"))
      .catch(() => setMessage("❌ Lỗi khi cập nhật thông tin!"));
  };

  // 4. HÀM MỚI: Xử lý Upload Avatar (Hoạt động 4)
  const handleAvatarUpload = async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    setUploading(true);
    setMessage("");

    // 4a. Tạo FormData
    const fileData = new FormData();
    fileData.append('avatar', file); // 'avatar' là key mà SV1 yêu cầu

    try {
      // 4b. Gọi API upload
      const res = await axios.post("http://localhost:3000/api/upload-avatar", fileData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data' // Bắt buộc
        }
      });
      
      // 4c. Cập nhật ảnh mới lên giao diện
      setFormData({ ...formData, avatarUrl: res.data.avatarUrl });
      setMessage("✅ Cập nhật avatar thành công!");

    } catch (err) {
      console.error(err);
      setMessage("❌ Lỗi khi tải ảnh lên.");
    } finally {
      setUploading(false);
    }
  };

  if (loading) return <p style={{ textAlign: "center" }}>⏳ Đang tải...</p>;

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <h2 className="auth-title">Thông tin cá nhân</h2>
        
        {/* 5. GIAO DIỆN MỚI: Upload Avatar (Hoạt động 4) */}
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <img 
            src={formData.avatarUrl} 
            alt="Avatar" 
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', border: '2px solid #ddd' }} 
          />
          
          <label 
            htmlFor="avatar-upload" 
            style={{ display: 'block', marginTop: '10px', cursor: 'pointer', color: '#007bff' }}
          >
            {uploading ? 'Đang tải lên...' : 'Thay đổi ảnh'}
          </label>
          
          <input 
            type="file" 
            id="avatar-upload" 
            accept="image/*" 
            style={{ display: 'none' }} 
            onChange={handleAvatarUpload} 
            disabled={uploading}
          />
        </div>
        {/* --- Kết thúc phần Avatar --- */}

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

        {/* 6. Đã xóa nút Đăng xuất (vì đã có trên AppNavbar) */}

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