import express from "express";
import { getAllUsers, deleteUser } from "../controllers/userController.js";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

// ✅ Lấy danh sách tất cả user (chỉ admin)
router.get("/", verifyToken, verifyAdmin, getAllUsers);

// ✅ Xóa user (admin hoặc chính chủ)
router.delete("/:id", verifyToken, deleteUser);

export default router;
