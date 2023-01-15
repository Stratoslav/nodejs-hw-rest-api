// const fs = require("fs").promises;
// const path = require("path");
// class Contacts {
//   constructor() {
//     this.pathToContacts = path.resolve(__dirname, "./db/contacts.json");
//   }

//   listContacts = async () => {
//     const userContacts = await fs.readFile(this.pathToContacts, {
//       encoding: "utf-8",
//     });
//     const parsed = JSON.parse(userContacts);
//     return parsed;
//   };

//   getContactById = async (contactId) => {
//     const users = await this.listContacts();
//     const getUser = users.filter((u) =>
//       Number(u.id) === contactId ? u : null
//     );
//   };

//   removeContact = async (contactId) => {
//     const users = await this.listContacts();
//     const result = users.filter((u) => Number(u.id) !== contactId);
//     fs.writeFile(this.pathToContacts, JSON.stringify(result));
//   };

//   addContact = async (name, email, phone) => {
//     const contacts = await this.listContacts();
//     const id = contacts.length ? Number([...contacts].pop().id) + 1 : 1;
//     const newUser = { id, nane: name, email: email, phone: phone };

//     contacts.push(newUser);
//     const dataContacts = JSON.stringify(contacts);
//     fs.writeFile(this.pathToContacts, dataContacts);
//     return newUser;
//   };
// }

// const Users = new Contacts();

// module.exports = Users;
