const express = require("express")
const signInRouter = express.Router()

const { logout } = require("../controllers/signInController");
const { signInUser } = require("../controllers/signInController");
const { signInValidation } = require("../validations/signUpValidations");

signInRouter.get("/logout", logout);
signInRouter.post("/signin", signInValidation, signInUser);

module.exports = signInRouter