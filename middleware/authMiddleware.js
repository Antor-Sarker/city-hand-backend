const jwt = require("jsonwebtoken");

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided" });
    }

    const varifyed = jwt.verify(
      authHeader.split(" ")[1],
      process.env.JWT_SECRET,
    );

    if (!varifyed || !varifyed.id)
      return res.status(401).json({ error: "invalid token" });

    req.userID = varifyed.id;
    next();
  } catch (error) {
    return res.status(400).json({ error: "invalid token" });
  }
};

module.exports = authMiddleware;
