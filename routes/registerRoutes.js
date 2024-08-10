const express = require("express")
const registerRouter = express.Router()

const { registerUser } = require("../controllers/registerController.js");
const { registerValidation } = require("../validations/registerValidations.js");

registerRouter.post("/register", registerValidation, registerUser);

module.exports = registerRouter