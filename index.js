// ===========================================
// const argv = require("yargs").argv;
// function invokeAction({ action, id, name, email, phone }) {
//   switch (action) {
//     case "list":
//       Users.listContacts();
//       break;

//     case "get":
//       Users.getContactById(id);
//       break;

//     case "add":
//       Users.addContact(name, email, phone);
//       break;

//     case "remove":
//       Users.removeContact(id);
//       break;

//     default:
//       console.warn("\x1B[31m Unknown action type!");
//   }
// }

//invokeAction(argv);

//===============================================
// const getResult = async () => {
//   const getContact = await Users.listContacts();
//   console.log(getContact);
// };

// getResult();

//=================================================
//const http = require("http");
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const fs = require("fs");
const path = require("path");

const Users = require("./contacts");
const contactsRouter = require("./router/ContactsRouter");
const PORT = process.env.PORT || 3000;
const pathToLogs = path.resolve(__dirname, "errors.logs.json");
const app = express();
console.log(pathToLogs);
app.use(express.json());

// const parsedBody = (req) => {
//   return new Promise((reselve, reject) => {
//     let body = [];
//     req
//       .on("data", (chank) => {
//         body.push(chank);
//       })
//       .on("end", () => {
//         //const parsed = JSON.parse(body.toString());
//         reselve(body.toString());
//       })
//       .on("err", (err) => {
//         reject(err);
//       });
//   });
// };

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  next();
});

app.use("/contacts", contactsRouter);

app.get("/error/:name", (req, res, next) => {
  try {
    if (req.params.name === "error") {
      console.log(req.params);
      throw new Error("Error is exist");
    }
    res.send("No error");
  } catch (e) {
    next(e);
  }
});
app.get("/logs", async (req, res) => {
  let logs = fs.readFile(pathToLogs, { encoding: "utf-8" }, () =>
    console.log(pathToLogs)
  );
  console.log("LOGS", logs);
  logs = JSON.parse(logs);
  res.json(logs);
});
app.use(async (err, req, res, next) => {
  if (err) {
    let logs = fs.readFile(pathToLogs, "utf8", () => console.log("say hellp"));
    console.log(logs);
    logs = JSON.parse(logs);
    logs.push({
      date: new Data().toISOString(),
      name: err.message,
    });
  }
  logs = JSON.stringify(logs);
  await fs.readFile("./errors.logs.json", logs);
  console.log(err);
});

// const server = http.createServer(async (request, response) => {
//   const { url, method } = request;
//   switch (url) {
//     case "/contacts":
//       switch (method) {
//         case "GET":
//           const contacts = await Users.listContacts();
//           const parsedContacts = JSON.stringify(contacts);
//           response.setHeader("Content-Type", "application/json");
//           response.write(parsedContacts);
//           response.end();
//           break;
//         case "POST":
//           const body = await parsedBody(request);
//           console.log(body);
//           await Users.addContact(body.name, body.email, body.phone);
//           response.statusCode = 201;
//           response.end();
//           break;
//       }
//     default:
//       response.write("<h1>Welcome!</h1>");
//       response.end();
//   }
//   console.log("Create server");
// });

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
// server.listen(3000, (err) => {
//   if (err) {
//     console.log("something wrong");
//     return console.log(err);
//   }
//   console.log(`Server listening on port ${PORT}`);
// });
