const { Router } = require("express");
const Contacts = require("../contacts");

const contactsRouter = Router();

contactsRouter.get("/", async (req, res) => {
  const contacts = await Contacts.listContacts();
  res.json(contacts);
  //OR WE CAN USE --->
  //  res.setHeader("Content-Type", "application/json");
  // res.send(JSON.stringify(contacts));
});

contactsRouter.post("/", async (req, res) => {
  const { name, email, phone } = req.body;

  if (typeof name === "string" && typeof email === "string") {
    const createContacts = await Contacts.addContact(name, email, phone);
    res.json(createContacts);
    res.status(201);
  }
  res.status(400).send("Invalid value");
});

contactsRouter.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteById = await Contacts.removeContact(+id);
  res.json(deleteById);
  res.end();
});
module.exports = contactsRouter;
