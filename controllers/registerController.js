const { validationResult } = require("express-validator");
const { UserSchema } = require('../models/userSchema')
const { createUser } = require('../services/userService')

const registerUser = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return;
  }

  const user = new UserSchema(...Object.values(req.body));

  const result = createUser(user);

  if (!result.success) {
    res.status(500).json(result)
  }

  res.status(201).json({
    msg: "Usuario registrado exitosamente",
  });
};

module.exports = {
  registerUser,
};
