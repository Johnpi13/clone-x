const express = require("express");
const tweetRouter = express.Router();

const { publishTweet, listTweets, updateTweet, deleteTweet } = require("../controllers/tweetController");
const { publishTweetValidation } = require('../validations/tweetValidations');


tweetRouter.get("/", listTweets);
tweetRouter.post("/", publishTweetValidation, publishTweet);
tweetRouter.put("/", updateTweet);
tweetRouter.delete("/", deleteTweet);

module.exports = tweetRouter;
