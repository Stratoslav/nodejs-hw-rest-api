const mongoose = require("mongoose");

const contactsSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
    default: "User",
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  phone: {
    type: Number,
    required: true,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
});

class Contacts {
  constructor() {
    this.db = mongoose.model("Contacts", contactsSchema);
  }
  getContact = async () => {
    return await this.db.find();
  };
  createUser = async (userData) => {
    return await this.db.create(userData);
  };
  updateContact = async (id, contactData) => {
    return await this.db.findByIdAndUpdate(id, contactData, { new: true });
  };
  deleteContact = async (id) => {
    return await this.db.findByIdAndRemove(id);
  };
  getFavoriteContact = async (favorite) => {
    return await this.db.find(favorite);
  };
  favoriteContacts = async (contactId, body) => {
    return await this.db.findByIdAndUpdate(contactId, body, { new: true });
  };
}

module.exports = new Contacts();
