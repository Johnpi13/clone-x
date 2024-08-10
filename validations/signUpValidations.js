const { check } = require("express-validator");
const validate = require('./validation')

const signUpValidation = validate([
    check("email", "Email inválido").notEmpty().isEmail(),
    check("password", "La contraseña debe ser de al menos 8 caracteres").notEmpty().isLength(
      { min: 8 }
    ),
]);
  
module.exports = {
    signUpValidation,
};