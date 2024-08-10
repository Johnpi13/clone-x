const express = require("express")
const signUpRouter = express.Router()

const { signUpUser } = require("../controllers/signUpController");
const { signUpValidation } = require("../validations/signUpValidations");

signUpRouter.post("/signup", signUpValidation, signUpUser);

module.exports = signUpRouter