const express = require("express")
const signInRouter = express.Router()

const { signInUser } = require("../controllers/signInController");
const { signInValidation } = require("../validations/signUpValidations");

signInRouter.post("/signin", signInValidation, signInUser);

module.exports = signInRouter