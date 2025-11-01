import express from "express";
import multer from "multer";
import { uploadAvatar } from "../controllers/profileController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

router.post("/upload-avatar", verifyToken, upload.single("avatar"), uploadAvatar);

export default router;
