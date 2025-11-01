import jwt from "jsonwebtoken";

// Kiểm tra token hợp lệ
export const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer "))
      return res.status(401).json({ message: "Thiếu token hoặc token không hợp lệ" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = decoded; // gán thông tin user vào request
    console.log("✅ verifyToken decoded:", decoded); // debug
    next();
  } catch (err) {
    console.error("❌ Token verification failed:", err.message);
    return res.status(403).json({ message: "Xác thực thất bại hoặc token hết hạn" });
  }
};

// Kiểm tra quyền admin
export const verifyAdmin = (req, res, next) => {
  console.log("🔹 verifyAdmin req.user:", req.user); // debug quyền admin
  if (!req.user.isAdmin)
    return res.status(403).json({ message: "Chỉ admin mới có quyền" });
  next();
};
