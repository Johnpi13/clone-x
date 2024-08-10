const express = require("express")
const tweetRouter = express.Router()

const { publishTweet, listTweets, updateTweet, deleteTweet } = require("../controllers/tweetController")
const { publishTweetValidation } = require('../validations/tweetValidations')

tweetRouter.get("/tweet", listTweets);
tweetRouter.post("/tweet", publishTweetValidation, publishTweet);
tweetRouter.put("/tweet", updateTweet);
tweetRouter.delete("/tweet", deleteTweet);


module.exports = tweetRouter