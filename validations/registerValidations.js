const { check, body } = require("express-validator");
const validate = require('./validation')
const {
  getUser,
} = require("../services/userService");

const registerValidation = validate([
  check("email", "Email inválido").notEmpty().isEmail(),
  check("password", "La contraseña debe ser de al menos 8 caracteres").notEmpty().isLength(
    { min: 8 }
  ),

  body("credentials").custom(async (_, {req}) => {
    let userParams = {
      email: req.body.email,
      userName: req.body.userName
    }

    const user = await getUser(userParams)
    if (user) {
      throw new Error('usuario ya se encuentra registrado')
    }
    
    return true;
  }),
]);

module.exports = {
  registerValidation,
};
