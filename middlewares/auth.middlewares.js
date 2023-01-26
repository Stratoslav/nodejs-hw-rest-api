const { verifyToken } = require("../services/token.services");

const checkAuthTokenMiddleware = async (req, res, next) => {
  try {
    const token = req.get("Authorization");
    if (!token) {
      res.status(401).send("No token provider");
    }
    const data = await verifyToken(token);
    req.userId = data.id;
    next();
  } catch (e) {
    res.status(401).send("Invalid token");
  }
};

module.exports = {
  checkAuthTokenMiddleware,
};
