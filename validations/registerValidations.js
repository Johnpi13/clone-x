const { check, body } = require('express-validator');
const { getUser } = require('../services/userService')

const registerValidation = [
  check('email', 'Email inválido').isEmail(),
  check('password', 'La contraseña debe ser de al menos 8 caracteres').isLength({ min: 8 }),

  body('email').custom((email) => {
    const user = getUser(email);
    if (user) {
      throw new Error('El email ya está registrado');
    }
    return true;
  }),
  
  body('username').custom((username) => {
    const user = getUser(username);
    if (user) {
      throw new Error('El nombre de usuario ya está registrado');
    }
    return true;
  })
];

module.exports = {
    registerValidation
}