const express = require("express")
const router = express.Router()

const { registerUser } = require("../controllers/registerController")
const { signUpUser } = require("../controllers/signUpController")
const { publishTweet } = require("../controllers/tweetController")
const { countFollowers } = require("../controllers/usersFollowersController")

router.get("/posts", listPosts)
router.get("/users", listUsers)

module.exports = router