import jwt from "jsonwebtoken";

// Middleware kiểm tra token
export const verifyToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  // Lấy token từ header: "Bearer <token>"
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Không có token, bị chặn truy cập" });
  }

  try {
    // Giải mã token bằng secret key trong .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Lưu thông tin userId vào request
    next(); // Cho phép đi tiếp tới controller
  } catch (error) {
    res.status(403).json({ message: "Token không hợp lệ" });
  }
};
