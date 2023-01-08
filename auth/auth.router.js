const { Router } = require("express");
const {
  loginController,
  registrationController,
} = require("./auth.controller");
const authRouter = Router();

authRouter.post("/registration", registrationController);
authRouter.post("/login", loginController);

module.exports = authRouter;
