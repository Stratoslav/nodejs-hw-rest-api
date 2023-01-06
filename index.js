const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const fs = require("fs");
const path = require("path");
const mongoose = require("mongoose");
const Users = require("./contacts");

const startServer = async () => {
  //CONNECTION TO M
  mongoose.set("strictQuery", true);
  await mongoose.connect(
    "mongodb+srv://stratoslav:qwertyasdfg123@start.mker2iq.mongodb.net/nnn?w=majority"
  );

  console.log("Data base has been conected");
  const contactsRouter = require("./router/ContactsRouter");
  const PORT = process.env.PORT || 3000;
  const pathToLogs = path.resolve(__dirname, "errors.logs.json");
  const app = express();
  console.log(pathToLogs);
  app.use(express.json());

  app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers", "*");
    res.setHeader("Access-Control-Allow-Methods", "*");
    next();
  });

  app.use("/", contactsRouter);

  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
};

startServer();
