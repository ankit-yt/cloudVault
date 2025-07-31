const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

module.exports.userAuthentication = async (req, res, next) => {
  console.log("chla")
  try {
    const token = req.cookies.token || req.headers.authorization?.split(" ")[1];
    console.log("Token:", token);

    if (!token) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token expired, please log in again" });
      }
      return res.status(403).json({ error: "Invalid token" });
    }

    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    req.user = user;
    console.log("User authenticated:", user);
    next();
  } catch (error) {
    console.error("Authentication Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
