import React, { useState } from "react";
import LoginForm from "./components/LoginForm";
import SignupForm from "./components/SignupForm";
import "./App.css";

export default function App() {
  const [activeTab, setActiveTab] = useState("login");

  return (
    <div className="auth-wrapper">
      {/* Thanh tab trên cùng */}
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

      {/* Phần form */}
      <div className="auth-body">
        {activeTab === "login" ? (
          <LoginForm onSwitchToSignup={() => setActiveTab("signup")} />
        ) : (
          <SignupForm onSwitchToLogin={() => setActiveTab("login")} />
        )}
      </div>
    </div>
  );
}
