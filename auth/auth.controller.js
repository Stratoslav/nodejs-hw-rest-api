const Contacts = require("../contacts/contacts.model");
const bcrypt = require("bcrypt");
const { nextTick } = require("process");
const saltRounds = 10;
const registrationController = async (req, res, next) => {
  try {
    const { body } = req;
    const hashedPassword = await bcrypt.hash(body._id, +saltRounds);
    await Contacts.createContactsController({
      ...body,
      password: hashedPassword,
    });
    res.status(201).send("Created");
  } catch (e) {
    next(e);
  }
};

const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await Contacts.getOneContact(email);
    if (!user) {
      return res.status(400).send(`User with email ${email} not found`);
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if (!isPasswordEqual) {
      return res.status(404).send("Wrong password");
    }
    res.json({ email: user.email, name: user.name, phone: user.phone });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registrationController,
  loginController,
};
