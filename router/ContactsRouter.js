const { Router } = require("express");
const {
  getContactsController,
  createContactsController,
  updateContactController,
  removeContactController,
  rewriteFavoriteContactsController,
  getFavoriteOrNotContactsController,
  findContactsController,
} = require("../contacts/contacts.controller");
const { checkAuthTokenMiddleware } = require("../middlewares/auth.middlewares");
const contactsRouter = Router();

contactsRouter.get(
  "/contacts",
  checkAuthTokenMiddleware,
  getContactsController
);
contactsRouter.get("/contacts/:email", findContactsController);
contactsRouter.get(
  "/contacts/favorite/:boolean",

  getFavoriteOrNotContactsController
);
contactsRouter.post(
  "/contacts",

  createContactsController
);
contactsRouter.patch("/contacts/:id", updateContactController);
contactsRouter.delete("/contacts/:id", removeContactController);
contactsRouter.patch(
  "/contacts/:id/favorite",
  rewriteFavoriteContactsController
);

module.exports = contactsRouter;
