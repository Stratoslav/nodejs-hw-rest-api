//import fs from "fs";
const fs = require("fs");
const { promises: fsPromises } = fs;
const path = require("path");
//import path from "path";
// ==========================
//import doteenv from "dotenv";
//doteenv.config();
//import * as config from "./config.js";
//console.log(config);
// ==========================
// const getTxtFileByName = (filename) => {
//   return new Promise((res, rej) => {
//     fs.readFile(`./${filename}.txt`, { encoding: "ascii" }, (err, data) => {
//       if (err) {
//         rej(err);
//         return;
//       }
//       res(data);
//     });
//   });
// };

// getTxtFileByName("text").then((text) => console.log(text));

// ================================
// const concatStrin = () => {
//   const firstWord = fs.readFile("./text.txt", { encoding: "utf-8" });
//   const secondWord = fs.readFile("./text.txt", { encoding: "utf-8" });
//   return firstWord + secondWord;
// };

// concatStrin().then((result) => console.log(result));

// ===============================

// class User {
//   constructor() {
//     this.fileUsersPath = path.resolve(__dirname, "data", "users.json");
//   }
//   getUser = async () => {
//     console.log(this.fileUsersPath);
//     const userData = await fsPromises.readFile("./p/users.json");
//     return JSON.parse(userData);
//   };
// }

// export default new User();
