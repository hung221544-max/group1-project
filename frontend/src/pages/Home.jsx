import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    // 1. BỎ <nav>
    // 2. Dùng div.page-content (đã có CSS ở bước 1)
    <div className="page-content">
      <h1>Trang chủ</h1>
      <p>Chào mừng bạn đến với ứng dụng!</p>
      <p style={{ marginTop: '20px' }}>
        Bạn có thể 
        <Link 
          to="/auth" // Sửa link tới trang /auth
          style={{ margin: '0 5px', fontWeight: '600', color: '#E53935', textDecoration: 'none' }}
        >
          đăng nhập hoặc đăng ký
        </Link> 
        để tiếp tục.
      </p>
    </div>
  );
}
