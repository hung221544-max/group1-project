import express from "express";
import { signup, login, logout } from "../controllers/authControllers.js";

const router = express.Router();

// Đăng ký
router.post("/signup", signup);

// Đăng nhập
router.post("/login", login);

// Đăng xuất
router.post("/logout", logout);

export default router;
