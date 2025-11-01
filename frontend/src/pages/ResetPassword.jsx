// src/pages/ResetPassword.jsx

import React, { useState } from 'react';
import axios from 'axios';
// 1. Import hook để đọc URL
import { useSearchParams, useNavigate } from 'react-router-dom';

export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  
  // 2. Dùng hook để lấy tham số 'token' từ URL
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token'); // Lấy ?token=...

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    if (password !== confirmPassword) {
      setError('Mật khẩu không khớp!');
      return;
    }

    if (!token) {
      setError('Token không hợp lệ hoặc đã hết hạn.');
      return;
    }

    try {
      // 3. Gọi API của Sinh viên 1 (gửi cả token và password)
      const API_URL = 'http://localhost:3000/api/reset-password'; // Hỏi SV1 xem URL đúng chưa
      const response = await axios.post(API_URL, { token, newPassword: password });

      setMessage(response.data.message || 'Đổi mật khẩu thành công!');
      
      // Chuyển về trang đăng nhập sau 2 giây
      setTimeout(() => navigate('/auth'), 2000);

    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Đặt lại Mật khẩu</h2>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '5px' }}>Mật khẩu mới</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="confirmPassword" style={{ display: 'block', marginBottom: '5px' }}>Xác nhận Mật khẩu</label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Lưu mật khẩu
        </button>
      </form>
    </div>
  );
}