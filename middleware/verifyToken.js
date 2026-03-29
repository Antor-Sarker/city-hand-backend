const jwt = require("jsonwebtoken");

const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.header("Authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res
        .status(401)
        .json({ error: "Access denied. No token provided" });
    }

    const verifyed = jwt.verify(
      authHeader.split(" ")[1],
      process.env.ACCESS_TOKEN_SECRET,
    );

    if (!verifyed || !verifyed.id)
      return res.status(401).json({ error: "invalid token" });

    req.user= {
      userId: verifyed.id,
      role: verifyed.role
    }
    next();
  } catch (error) {
    return res.status(400).json({ error: "invalid token" });
  }
};

module.exports = verifyToken;