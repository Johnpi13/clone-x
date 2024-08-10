const express = require("express")
const registerRouter = express.Router()

const { registerUser } = require("../controllers/registerController.js")

registerRouter.get("/register", registerUser);

module.exports = registerRouter