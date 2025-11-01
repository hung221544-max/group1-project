// src/pages/ForgotPassword.jsx

import React, { useState } from 'react';
import axios from 'axios'; // Dùng axios cho tiện
import { Link } from 'react-router-dom';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState(''); // Để hiển thị thông báo
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setError('');

    try {
      // 1. Gọi API của Sinh viên 1
      const API_URL = 'http://localhost:3000/api/forgot-password'; // Hỏi SV1 xem URL đúng chưa
      const response = await axios.post(API_URL, { email });

      // 2. Hiển thị thông báo thành công
      setMessage(response.data.message || 'Nếu email tồn tại, chúng tôi đã gửi link khôi phục.');
    } catch (err) {
      setError(err.response?.data?.message || 'Đã xảy ra lỗi. Vui lòng thử lại.');
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Quên Mật khẩu</h2>
      <p>Nhập email của bạn để nhận liên kết khôi phục.</p>
      
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '5px' }}>Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
          />
        </div>

        {message && <p style={{ color: 'green' }}>{message}</p>}
        {error && <p style={{ color: 'red' }}>{error}</p>}

        <button type="submit" style={{ width: '100%', padding: '10px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
          Gửi yêu cầu
        </button>
      </form>
      
      <p style={{ textAlign: 'center', marginTop: '15px' }}>
        <Link to="/auth">Quay lại Đăng nhập</Link>
      </p>
    </div>
  );
}