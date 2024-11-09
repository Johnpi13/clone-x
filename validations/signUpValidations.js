const { check } = require("express-validator");
const validate = require('./validation')

const signInValidation = validate([
    check("userName", "Nombre de usuario inválido").notEmpty(),
    check("password", "La contraseña debe ser de al menos 8 caracteres").notEmpty().isLength(
      { min: 8 }
    ),
]);
  
module.exports = {
  signInValidation,
};