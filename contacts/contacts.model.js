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
  password: {
    type: String,
    required: true,
  },
});

class Contacts {
  constructor() {
    this.db = mongoose.model("Contacts", contactsSchema);
  }
  getContact = async () => {
    return await this.db.find();
  };
  getOneContact = async (email) => {
    return await this.db.findOne(email);
  };
  // getOneContact = async (email) => {
  //   return await this.db.find({ email });
  // };
  createUser = async (userData) => {
    return await this.db.create(userData);
  };
  updateContact = async (id, contactData) => {
    return await this.db.findByIdAndUpdate(id, contactData, { new: true });
  };
  deleteContact = async (id) => {
    return await this.db.findByIdAndRemove(id);
  };
  getFavoriteOrNoContact = async (favorite) => {
    return await this.db.find({ favorite });
  };

  favoriteContacts = async (contactId, body) => {
    return await this.db.findByIdAndUpdate(contactId, body, { new: true });
  };
}

module.exports = new Contacts();
