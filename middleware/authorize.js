const authorize = (allowedRoles) => {
  return (req, res, next) => {
    if (!req.user || !allowedRoles.includes(req.user.role)) {
      return res.status(401).json({
        status: false,
        message: "Access Denied",
      });
    }
    next();
  };
};

module.exports = authorize;
