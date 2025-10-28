import express from "express";
import { verifyToken, verifyAdmin } from "../middleware/authMiddleware.js";
import { getAllUsers, deleteUser } from "../controllers/userController.js";

const router = express.Router();

// 🧩 Chỉ admin mới xem được danh sách user
router.get("/", verifyToken, verifyAdmin, getAllUsers);

// 🧩 Admin hoặc chính chủ mới xóa được user
router.delete("/:id", verifyToken, verifyAdmin, deleteUser);

export default router;
