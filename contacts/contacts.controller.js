const { json } = require("express");
const userDB = require("./contacts.model");

const getContactsController = async (req, res, next) => {
  try {
    const contacts = await userDB.getContact();
    res.json(contacts);
  } catch (e) {
    next(e);
  }
};

const getAllFavoriteContacts = async (req, res, next) => {
  try {
    const { favorite } = req.params;
    const contacts = await userDB.getContact();
    console.log(contacts);
    contacts.filter((c) => (c.favorite === true ? res.json(c) : null));
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
    console.log(body.favorite);
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

const favoriteContactsController = async (req, res, next) => {
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
module.exports = {
  getContactsController,
  createContactsController,
  updateContactController,
  removeContactController,
  favoriteContactsController,
  getAllFavoriteContacts,
};
