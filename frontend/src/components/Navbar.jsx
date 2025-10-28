// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Navbar.css"; // tuỳ chọn nếu bạn muốn style riêng

export default function Navbar() {
  const location = useLocation();

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "center",
        gap: "30px",
        padding: "20px",
        background: "#fff",
        boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        borderRadius: "0 0 10px 10px",
      }}
    >
      <Link
        to="/"
        style={{
          textDecoration: "none",
          color: location.pathname === "/" ? "red" : "#333",
          fontWeight: location.pathname === "/" ? "bold" : "normal",
        }}
      >
        Trang chủ
      </Link>
      <Link
        to="/register"
        style={{
          textDecoration: "none",
          color: location.pathname === "/register" ? "red" : "#333",
          fontWeight: location.pathname === "/register" ? "bold" : "normal",
        }}
      >
        Đăng ký
      </Link>
      <Link
        to="/login"
        style={{
          textDecoration: "none",
          color: location.pathname === "/login" ? "red" : "#333",
          fontWeight: location.pathname === "/login" ? "bold" : "normal",
        }}
      >
        Đăng nhập
      </Link>
    </nav>
  );
}
