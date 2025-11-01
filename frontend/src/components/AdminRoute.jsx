import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Component này sẽ kiểm tra xem user có phải là Admin không
const useAuth = () => {
  // 1. Lấy role từ localStorage
  const userRole = localStorage.getItem('role');

  // 2. Kiểm tra
  if (userRole === 'admin') {
    return true; // Là Admin
  }
  return false; // Không phải Admin
};

// Component "Bảo vệ"
function AdminRoute() {
  const isAdmin = useAuth();

  // Nếu là Admin, cho phép đi tiếp (render <Outlet />)
  // Nếu không, đá về trang chủ (hoặc trang login)
  return isAdmin ? <Outlet /> : <Navigate to="/login" />;
}

export default AdminRoute;