const express = require("express")
const router = express.Router()

const { registerUser } = require("../controllers/registerController.js")
const { signUpUser } = require("../controllers/signUpController")
const { publishTweet } = require("../controllers/tweetController")
const { countFollowers } = require("../controllers/userFollowersController")

module.exports = router