const express = require("express")
const signUpRouter = express.Router()

const { signUpUser } = require("../controllers/signUpController")

signUpRouter.post("/signup", signUpUser);

module.exports = signUpRouter