const { check, body } = require("express-validator");
const {
  getUserByEmail,
  getUserByUsername,
} = require("../services/userService");

const validate = (validations) => {
  return async (req, res, next) => {
    for (const validation of validations) {
      const result = await validation.run(req);

      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }

    next();
  };
};

const registerValidation = validate([
  check("email", "Email inválido").isEmail(),
  check("password", "La contraseña debe ser de al menos 8 caracteres").isLength(
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
