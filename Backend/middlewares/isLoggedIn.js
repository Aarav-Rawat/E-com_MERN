import jwt from "jsonwebtoken";

export const isLoggedIn = (req, res, next) => {
  try {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(" ")[1];
    
    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Authentication required"
      });
    }

    try {
      const userData = jwt.verify(token, process.env.JWT_SECRET_KEY);
      req.user = userData;
      next();
    } catch (err) {
      console.error("Token verification error:", err);
      return res.status(401).json({
        success: false,
        message: "Invalid or expired token"
      });
    }
  } catch (err) {
    console.error("Auth middleware error:", err);
    return res.status(500).json({
      success: false,
      message: "Server error during authentication"
    });
  }
};