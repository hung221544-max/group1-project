import React, { useState } from "react";
// 1. Import 'useLocation' để biết đang ở trang nào
import { 
  BrowserRouter as Router, 
  Routes, 
  Route, 
  Link, 
  useLocation 
} from "react-router-dom";

// 2. Import tất cả các trang
import Home from "./pages/Home";
import LoginForm from "./pages/LoginForm";
import SignupForm from "./pages/SignupForm";
import Profile from "./pages/Profile";

// 3. Import CSS chung
import "./App.css"; // Hoặc index.css, tùy bạn

// 4. Component Navbar (Tách ra từ App để dùng useLocation)
function AppNavbar() {
  const location = useLocation(); // Hook lấy đường dẫn hiện tại
  const pathname = location.pathname;

  return (
    <nav className="navbar">
      <Link 
        to="/" 
        className={`nav-item ${pathname === "/" ? "active" : ""}`}
      > 
        Trang chủ
      </Link>
      <Link 
        to="/auth" 
        className={`nav-item ${pathname === "/auth" ? "active" : ""}`}
      > 
        Đăng nhập / Đăng ký
      </Link>
      <Link 
        to="/profile" 
        className={`nav-item ${pathname === "/profile" ? "active" : ""}`}
      > 
        Hồ sơ
      </Link>
    </nav>
  );
}

// 5. Component Trang Đăng nhập/Đăng ký (Tách ra từ App)
function AuthPage() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-container"> {/* Dùng lại CSS cũ */}
      <div className="auth-form-box"> {/* Dùng lại CSS cũ */}
        
        {/* Đây là code gốc của bạn, rất tốt */}
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


// 6. Component App chính
export default function App() {
  return (
    <Router>
      {/* Navbar giờ nằm ở đây, bên ngoài <Routes> */}
      <AppNavbar />

      {/* 🔹 Nội dung trang */}
      <Routes>
        {/* Sửa lại: Trang chủ là path="/" */}
        <Route path="/" element={<Home />} />
        
        {/* Sửa lại: Trang Login/Signup là path="/auth" */}
        <Route path="/auth" element={<AuthPage />} />

        {/* Trang Profile (Giữ nguyên) */}
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
  );
}