const { JWT_SECRET } = require("../configs/Constants");
const jwt = require("jsonwebtoken");

function authMiddleware(roles = []) {
  return (req, res, next) => {
    const authorizationHeader = req.headers.authorization;

    
     const token = authorizationHeader.split(" ")[0];


    jwt.verify(token, JWT_SECRET, (err, user) => {
      if (err) {
        return res.status(403).json({
          message: "Forbidden: Invalid token",
        });
      }

      // Check for roles if any are provided
      if (roles.length && !roles.includes(user.role)) {
        return res.status(403).json({
          message: "Forbidden: Insufficient role",
        });
      }

      req.user = user;
      next();
    });
  };
}

module.exports = {
    authMiddleware
}