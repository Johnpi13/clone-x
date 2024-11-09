const express = require("express");
const tweetRouter = express.Router();

const tweetController = require("../controllers/tweetController");
const { publishTweetValidation } = require('../validations/tweetValidations');

tweetRouter.get("/", tweetController.listTweets);
tweetRouter.post("/", publishTweetValidation, tweetController.publishTweet);
tweetRouter.put("/", tweetController.updateTweet);
tweetRouter.delete("/", tweetController.deleteTweet);

module.exports = tweetRouter;
