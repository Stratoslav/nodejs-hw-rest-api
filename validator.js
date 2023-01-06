const validator = require("validator");

const isEmail = (email) => validator.default.isEmail(email);
const isName = (name) => {
  const nameUser = validator.default.isLength(name, { min: 3, max: 24 });

  return nameUser;
};
const isMobilePhone = (phone) => {
  const phoneUser = validator.default.isMobilePhone(phone, ["uk-UA"]);
  return phoneUser;
};

module.exports = {
  isEmail,
  isName,
  isMobilePhone,
};
