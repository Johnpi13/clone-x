const express = require("express")
const signUpRouter = express.Router()

const { signUpUser } = require("../controllers/signUpController")

signUpRouter.get("/signUp", signUpUser);

module.exports = signUpRouter