const { Router } = require("express");
const {
  registrationController,
  loginController,
} = require("../auth/auth.controller");
const authRouter = Router();

authRouter.post("/registration", registrationController);
authRouter.post("/login", loginController);

module.exports = authRouter;
