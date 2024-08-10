const users = require("../mocked_data/users");

const getUserByEmail = (userEmail) => {
  let userFound = users.find((x) => x.email === userEmail);

  return userFound;
};

const getUserByUsername = (username) => {
  let userFound = users.find((x) => x.name === username);

  return userFound;
};

module.exports = {
  getUserByEmail,
  getUserByUsername,
};
