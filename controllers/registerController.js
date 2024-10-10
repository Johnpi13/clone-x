const { validationResult } = require("express-validator");
const { createUser } = require('../services/userService');
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
 
const registerUser = async (req, res) => {
 
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
 
  try {
 
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
 
 
    const userData = {
      fullName: req.body.fullName,
      userName: req.body.userName,
      email: req.body.email,
      password: hashedPassword,
      followers: [],
      following: []
    };
 
 
    const result = await createUser(userData);
 
    if (!result.success) {
      return res.status(500).json(result);
    }
 
 
    res.status(201).json({
      msg: "Usuario registrado exitosamente",
      user: result.user,
    });
  } catch (error) {
 
    res.status(500).json({ msg: "Error al registrar el usuario", error: error.message });
  }
};
 
module.exports = {
  registerUser,
};