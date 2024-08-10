const express = require("express")
const tweetRouter = express.Router()

const { publishTweet, listTweets, updateTweet, deleteTweet } = require("../controllers/tweetController")

tweetRouter.post("/tweet", publishTweet);
tweetRouter.get("/tweet", listTweets);
tweetRouter.delete("/tweet", deleteTweet);
tweetRouter.put("/tweet", updateTweet);


module.exports = tweetRouter