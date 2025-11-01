import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
  Navigate, 
  useNavigate 
} from "react-router-dom";

// Import các trang cũ
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Profile from "./pages/Profile";
import AdminDashboard from "./pages/AdminDashboard";

// 1. 🔹 THÊM IMPORT CHO HOẠT ĐỘNG 4 🔹
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

import "./App.css";

// --- COMPONENT NAVBAR (GIỮ NGUYÊN) ---
function AppNavbar() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    navigate('/auth'); 
  };

  return (
    <nav className="navbar">
      {/* Link Trang chủ */}
      <Link
        to="/"
        className={`nav-item ${pathname === "/" ? "active" : ""}`}
      >
        Trang chủ
      </Link>
      
      {/* NẾU CHƯA ĐĂNG NHẬP */}
      {!token && (
        <Link
          to="/auth"
          className={`nav-item ${pathname === "/auth" ? "active" : ""}`}
        >
          Đăng nhập / Đăng ký
        </Link>
      )}

      {/* NẾU ĐÃ ĐĂNG NHẬP */}
      {token && (
        <Link
          to="/profile"
          className={`nav-item ${pathname === "/profile" ? "active" : ""}`}
        >
          Hồ sơ
        </Link>
      )}

      {/* NẾU LÀ ADMIN */}
      {token && role === 'admin' && (
        <Link
          to="/admin/users"
          className={`nav-item ${pathname === "/admin/users" ? "active" : ""}`}
        >
          Quản lý (Admin)
        </Link>
      )}

      {/* NÚT ĐĂNG XUẤT */}
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

// --- COMPONENT BẢO VỆ ROUTE (GIỮ NGUYÊN) ---
function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) {
    return <Navigate to="/auth" replace />;
  }
  return children;
}

// --- COMPONENT BẢO VỆ ROUTE ADMIN (GIỮ NGUYÊN) ---
function AdminRoute({ children }) {
  const token = localStorage.getItem('token');
  const role = localStorage.getItem('role');
  if (!token || role !== 'admin') {
    return <Navigate to="/" replace />; 
  }
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

        {/* 2. 🔹 THÊM 2 ROUTE MỚI CHO HOẠT ĐỘNG 4 🔹 */}
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />


        {/* Route được bảo vệ (Phải đăng nhập) */}
        <Route 
          path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } 
        />

        {/* Route của Admin (Phải là Admin) */}
        <Route 
          path="/admin/users" 
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          } 
        />
        
        {/* Route dự phòng */}
        <Route path="*" element={<Navigate to="/" />} />
        
      </Routes>
    </Router>
  );
}