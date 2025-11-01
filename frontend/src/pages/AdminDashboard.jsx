import React, { useState, useEffect } from 'react';

function AdminDashboard() {
  // 1. State để lưu danh sách user, lỗi, và trạng thái tải
  const [users, setUsers] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  // 2. useEffect sẽ chạy 1 lần khi component được tải
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        // Lấy token của Admin đã lưu khi đăng nhập
        const token = localStorage.getItem('token');

        if (!token || localStorage.getItem('role') !== 'admin') {
          setError('Bạn cần đăng nhập với quyền Admin để xem trang này.');
          setLoading(false);
          return;
        }

        // 🔹 QUAN TRỌNG: Sửa lại URL API của SV1 cho đúng
        const API_URL = 'http://localhost:3000/api/users'; 

        const response = await fetch(API_URL, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}` // Gửi token
          }
        });

        if (!response.ok) {
          if (response.status === 403) {
            setError('Bạn không có quyền truy cập chức năng này.');
          } else {
            setError('Không thể tải danh sách người dùng.');
          }
          setLoading(false);
          return;
        }

        const data = await response.json();
        setUsers(data); // Lưu danh sách user vào state
        setLoading(false); // Dừng tải

      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Dấu [] rỗng nghĩa là chỉ chạy 1 lần

  // 3. HÀM XỬ LÝ XÓA (cho Bước 3)
  const handleDeleteUser = async (userId) => {
    // 3a. HỎI XÁC NHẬN (Yêu cầu screenshot)
    const isConfirmed = window.confirm(
      'Bạn có chắc chắn muốn xóa người dùng này?'
    );

    if (!isConfirmed) {
      return; // Dừng lại nếu Admin bấm "Cancel"
    }

    // 3b. Nếu Admin bấm "OK", gọi API DELETE
    try {
      const token = localStorage.getItem('token');
      // 🔹 Sửa lại URL API cho đúng (có /id)
      const API_URL = `http://localhost:3000/api/users/${userId}`;

      const response = await fetch(API_URL, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Xóa thất bại. Vui lòng thử lại.');
      }

      // 3c. Xóa thành công: Cập nhật lại giao diện
      // Lọc ra và tạo một mảng mới không chứa user vừa bị xóa
      setUsers(users.filter(user => user._id !== userId)); // (hoặc user._id)

    } catch (err) {
      // Thông báo lỗi xóa
      alert(err.message);
    }
  };

  // 4. HIỂN THỊ (RENDER)
  if (loading) {
    return <div>Đang tải danh sách người dùng...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>Lỗi: {error}</div>;
  }

  return (
    <div>
      <h2>Trang Quản Trị - Danh sách người dùng ({users.length})</h2>
      
      {/* 4a. Bảng hiển thị (Yêu cầu screenshot 1) */}
      <table border="1" style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
        <thead>
          <tr>
            <th style={{padding: '8px'}}>ID</th>
            <th style={{padding: '8px'}}>Email</th>
            <th style={{padding: '8px'}}>Họ và Tên</th>
            <th style={{padding: '8px'}}>Quyền (Role)</th>
            <th style={{padding: '8px'}}>Hành động</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            // (Lưu ý: Dùng user.id hoặc user._id tùy theo CSDL của SV1)
            <tr key={user._id}> 
              <td style={{padding: '8px'}}>{user._id}</td>
              <td style={{padding: '8px'}}>{user.email}</td>
              <td style={{padding: '8px'}}>{user.name || 'Chưa cập nhật'}</td>
              <td style={{padding: '8px'}}>{user.role}</td>
              <td style={{padding: '8px'}}>
                {/* 4b. Nút xóa (Yêu cầu screenshot 2) */}  
                <button
                  style={{ color: 'red', cursor: 'pointer' }}
                  onClick={() => handleDeleteUser(user._id)} // (hoặc user._id)
                >
                  Xóa
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;