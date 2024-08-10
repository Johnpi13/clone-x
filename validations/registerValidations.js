const { check, body } = require("express-validator");
const validate = require('./validation')
const {
  getUserByEmail,
  getUserByUsername,
} = require("../services/userService");

const registerValidation = validate([
  check("email", "Email inválido").notEmpty().isEmail(),
  check("password", "La contraseña debe ser de al menos 8 caracteres").notEmpty().isLength(
    { min: 8 }
  ),

  body("email").custom((email, { req }) => {
    const user = getUserByEmail(req.query.email);
    if (user) {
      throw new Error("El email ya está registrado");
    }
    return true;
  }),

  body("username").custom((username, { req }) => {
    console.log(username);
    const user = getUserByUsername(req.query.username);
    if (user) {
      throw new Error("El nombre de usuario ya está registrado");
    }
    return true;
  }),
]);

module.exports = {
  registerValidation,
};
