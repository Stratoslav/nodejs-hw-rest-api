const userDB = require("./contacts.model");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await userDB.getContact();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const getFavoriteOrNotContactsController = async (req, res, next) => {
  try {
    const { boolean } = req.params;
    const contacts = await userDB.getFavoriteOrNoContact(JSON.parse(boolean));
    res.status(200).json(contacts);
  } catch (e) {
    next(e);
  }
};

const createContactsController = async (req, res, next) => {
  try {
    const { body } = req;
    if (body.favorite === null || undefined) {
      body.favorite === false;
    }
    const newContact = await userDB.createUser(body);
    res.status(201).json(newContact);
  } catch (e) {
    next(e);
  }
};

const updateContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...data } = req.body;
    const updatedContact = await userDB.updateContact(id, data);
    res.status(200).json(updatedContact);
  } catch (e) {
    next(e);
  }
};

const removeContactController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const removedContact = await userDB.deleteContact(id);
    res.json(removedContact);
  } catch (e) {
    next(e);
  }
};

const rewriteFavoriteContactsController = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { ...body } = req.body;
    if (body === null) {
      return res.status(400).json([{ message: "missing field favorite" }]);
    }
    const updatedContact = await userDB.favoriteContacts(id, body);
    res.json(updatedContact);
  } catch (e) {
    res.status(404).json([{ message: "Not found" }]);
    next(e);
  }
};
const findContactsController = async (req, res, next) => {
  try {
    const { email } = req.params;
    const contact = await userDB.getOneContact(email);

    res.json(contact);
    res.end();
  } catch (e) {
    console.log(e);
  }
};
module.exports = {
  getContactsController,
  createContactsController,
  updateContactController,
  removeContactController,
  rewriteFavoriteContactsController,
  getFavoriteOrNotContactsController,
  findContactsController,
};
