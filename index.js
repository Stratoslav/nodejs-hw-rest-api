const dotenv = require("dotenv");
dotenv.config();

const express = require("express");
const mongoose = require("mongoose");
const authRouter = require("./auth/auth.router");

const startServer = async () => {
  mongoose.set("strictQuery", true);
  await mongoose.connect(
    `mongodb+srv://${process.env.NAME_MONGO_DB}:${process.env.PASSWORD_MONGO_DB}.mongodb.net/nnn?w=majority`
  );

  console.log("Data base has been connected");
  const contactsRouter = require("./router/ContactsRouter");
  const PORT = Number(process.env.PORT) || 3000;
  const app = express();

  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
  });

  app.use("/", contactsRouter);
  app.use("/auth", authRouter);

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

startServer();
