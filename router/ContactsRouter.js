const { Router } = require("express");
const {
  getContactsController,
  createContactsController,
  updateContactController,
  removeContactController,
  favoriteContactsController,
  getAllFavoriteContacts,
} = require("../contacts/contacts.controller");

const contactsRouter = Router();

contactsRouter.get("/contacts", getContactsController);
contactsRouter.get("/contacts/favorite", getAllFavoriteContacts);
contactsRouter.post("/contacts", createContactsController);
contactsRouter.patch("/contacts/:id", updateContactController);
contactsRouter.delete("/contacts/:id", removeContactController);
contactsRouter.patch("/contacts/:id/favorite", favoriteContactsController);

module.exports = contactsRouter;
