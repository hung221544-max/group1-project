import express from "express";
import { forgotPassword, resetPassword } from "../controllers/passwordController.js";
import { uploadAvatar, uploadAvatarMiddleware } from "../controllers/avatarController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);
router.post("/upload-avatar", verifyToken, uploadAvatarMiddleware, uploadAvatar);

export default router;
