const jwt = require("jsonwebtoken");

const createVerifiationToken = async (payload) => {
  return await jwt.sign(payload, process.env.ACCESS_KEY);
};

const verifyToken = async (token) => {
  return await jwt.verify(token, process.env.ACCESS_KEY);
};
module.exports = {
  createVerifiationToken,
  verifyToken,
};
