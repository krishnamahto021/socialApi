const bcrypt = require("bcrypt");

module.exports.hashingPasswordFunction = async (password) => {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

module.exports.compareHashedPasswordFunction = (password, hashedPassword) => {
  return bcrypt.compare(password, hashedPassword);
};
