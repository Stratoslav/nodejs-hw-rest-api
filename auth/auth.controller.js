const Contacts = require("../contacts/contacts.model");
const bcrypt = require("bcrypt");
const { createVerifiationToken } = require("../services/token.services");
const registrationController = async (req, res, next) => {
  try {
    const { body } = req;

    const hashedPassword = await bcrypt.hash(body.password, +process.env.SALT);
    await Contacts.createUser({ ...body, password: hashedPassword });
    console.log(hashedPassword);
    res.status(201).send("Created");
  } catch (e) {
    next(e);
  }
};
const loginController = async (req, res, next) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const contact = await Contacts.getOneContact({ email });
    if (!contact) {
      res.status(404).send(`Contact with email ${email} not found`);
    }
    const isPasswordEqual = bcrypt.compare(password, contact.password);
    if (!isPasswordEqual) {
      res.status(404).send("Wrong Password");
    }
    const token = await createVerifiationToken({ id: contact._id });
    res.json({
      access_token: token,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  registrationController,
  loginController,
};
