import express from "express";
import { uploadAvatar, uploadAvatarMiddleware } from "../controllers/avatarController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload-avatar", verifyToken, uploadAvatarMiddleware, uploadAvatar);

export default router;
