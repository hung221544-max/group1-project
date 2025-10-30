import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate,         // 🔹 MỚI: Dùng để chuyển hướng
  useNavigate       // 🔹 MỚI: Dùng cho nút Đăng xuất
} from "react-router-dom";

// Import các trang cũ
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Profile from "./pages/Profile";

// 🔹 MỚI: Import trang Admin (theo hướng dẫn ở Hoạt động 3)
import AdminDashboard from "./pages/AdminDashboard";

import "./App.css";

// --- COMPONENT NAVBAR (ĐƯỢC CẬP NHẬT) ---
function AppNavbar() {
  const location = useLocation();
  const pathname = location.pathname;

  // 🔹 MỚI: Thêm hook Navigate để xử lý Đăng xuất
  const navigate = useNavigate();

  // 🔹 MỚI: Kiểm tra trạng thái đăng nhập từ localStorage
  // Giao diện sẽ tự động cập nhật dựa trên cái này
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  // 🔹 MỚI: Hàm xử lý Đăng xuất
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    // Có thể xóa thêm các thông tin user khác nếu có
    navigate('/auth'); // Chuyển về trang đăng nhập
  };

  return (
    <nav className="navbar">
      {/* Link Trang chủ (Chung) */}
      <Link
        to="/"
        className={`nav-item ${pathname === "/" ? "active" : ""}`}
      >
        Trang chủ
      </Link>

      {/* 🔹 MỚI: Hiển thị có điều kiện */}
      
      {/* NẾU CHƯA ĐĂNG NHẬP (không có token) */}
      {!token && (
        <Link
          to="/auth"
          className={`nav-item ${pathname === "/auth" ? "active" : ""}`}
        >
          Đăng nhập / Đăng ký
        </Link>
      )}

      {/* NẾU ĐÃ ĐĂNG NHẬP (có token) */}
      {token && (
        <Link
          to="/profile"
          className={`nav-item ${pathname === "/profile" ? "active" : ""}`}
        >
          Hồ sơ
        </Link>
      )}

      {/* NẾU LÀ ADMIN (có token VÀ role 'admin') */}
      {token && role === 'admin' && (
        <Link
          to="/admin/users"
          className={`nav-item ${pathname === "/admin/users" ? "active" : ""}`}
        >
          Quản lý (Admin)
        </Link>
      )}

      {/* NẾU ĐÃ ĐĂNG NHẬP (hiển thị nút Đăng xuất) */}
      {token && (
        <button onClick={handleLogout} className="nav-item-logout">
          Đăng xuất
        </button>
      )}

    </nav>
  );
}

// --- COMPONENT TRANG ĐĂNG NHẬP/ĐĂNG KÝ (GIỮ NGUYÊN) ---
function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-container">
      <div className="auth-form-box">
        <div className="auth-header">
          <button
            className={`auth-tab ${activeTab === "login" ? "active" : ""}`}
            onClick={() => setActiveTab("login")}
          >
            Đăng nhập
          </button>
          <button
            className={`auth-tab ${activeTab === "signup" ? "active" : ""}`}
            onClick={() => setActiveTab("signup")}
          >
            Đăng ký
          </button>
        </div>
        <div className="auth-body">
          {activeTab === "login" ? (
            <LoginForm onSwitchToSignup={() => setActiveTab("signup")} />
          ) : (
            <SignupForm onSwitchToLogin={() => setActiveTab("login")} />
          )}
        </div>
      </div>
    </div>
  );
}

// --- 🔹 MỚI: COMPONENT BẢO VỆ ROUTE (CHO USER ĐÃ ĐĂNG NHẬP) ---
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  
  if (!token) {
    // Nếu không có token, chuyển hướng về trang đăng nhập
    return <Navigate to="/auth" replace />;
  }
  
  // Nếu có token, cho phép truy cập
  return children;
}

// --- 🔹 MỚI: COMPONENT BẢO VỆ ROUTE (CHO ADMIN) ---
function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  if (!token || role !== 'admin') {
    // Nếu không có token HOẶC role không phải 'admin', chuyển hướng
    return <Navigate to="/" replace />; // (Về trang chủ hoặc trang đăng nhập)
  }

  // Nếu là Admin, cho phép truy cập
  return children;
}


// --- COMPONENT APP CHÍNH (ĐƯỢC CẬP NHẬT) ---
export default function App() {
  return (
    <Router>
      <AppNavbar />

      <Routes>
        {/* Route công khai */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<AuthPage />} />

        {/* 🔹 MỚI: Route được bảo vệ (Phải đăng nhập) */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* 🔹 MỚI: Route của Admin (Phải là Admin) */}
        <Route 
          path="/admin/users" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        
        {/* 🔹 MỚI: Route dự phòng (Bất kỳ đường dẫn nào không khớp) */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </Router>
  );
}
