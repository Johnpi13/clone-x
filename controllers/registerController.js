const { validationResult } = require("express-validator");

const registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return;
  }

  res.status(201).json({
    msg: "Usuario registrado exitosamente",
  });
};

module.exports = {
  registerUser,
};
