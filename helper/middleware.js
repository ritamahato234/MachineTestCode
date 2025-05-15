const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");



const unprotectedRoutes = ["/v1/api/auth/login", "/v1/api/auth/register"];

const authMiddleware = async (req, res, next) => {
  try {
    // Allow access to unprotected routes
    if (unprotectedRoutes.includes(req.path)) {
      return next();
    }

    const token = req.headers.authorization;
    const roleType = req.headers.roletype;

    if (!token) {
      return res.status(400).json({
        status: false,
        message: "Missing authorization token",
      });
    }

    if (!roleType || roleType.trim() === "") {
      return res.status(400).json({
        status: false,
        message: "Missing or invalid roletype in headers",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(400).json({
        status: false,
        message: "Invalid token or user does not exist",
      });
    }

   
    if (user.role !== roleType.toLowerCase()) {
      return res.status(403).json({
        status: false,
        message: "Access denied for this role",
      });
    }
      const path = req.originalUrl.toLowerCase();
    //  console.log("jkj",path)
    if (path.includes("/member") && user.role !== "member") {
      console.log("99")
      return res.status(403).json({
        status: false,
        message: "Access denied",
      });
    }

    if (path.includes("/admin") && user.role !== "admin") {
      return res.status(403).json({
        status: false,
        message: "Access denied",
      });
    }
   
    req.user = user;
    req.roleType = user.role;
    req.token = token;

    return next();
  } catch (error) {
    console.log("Auth Middleware Error:", error);
    return res.status(401).json({
      status: false,
      message: "Unauthorized: Invalid or expired token",
    });
  }
};

module.exports = authMiddleware;
