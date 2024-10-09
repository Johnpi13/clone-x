const Tweet = require('../models/tweetSchema');
const tweetService = require('../services/tweetService');

const listTweets = (request, response) => {
    const tweets = getTweets();
    response.status(200).json(tweets);
};

const publishTweet = (request, response) => {
    try {
        const userName = request.user;
        const { body } = request.body;

        const newTweet = new Tweet(userName, body);

        const result = tweetService.createTweet(newTweet);

        response.status(201).json(result);
    }
    catch (err) { 
        response.status(500).json({
            success: false,
            err: err
        })
    }
};

const updateTweet = (request, response) => {
    const { id, body } = request.body;
    let tweets = getTweets();
    const tweetIndex = tweets.findIndex(tweet => tweet.id === id);

    if (tweetIndex !== -1) {
        tweets[tweetIndex].body = body;
        response.status(200).json({ msg: "Tweet actualizado", tweet: tweets[tweetIndex] });
    } else {
        response.status(404).json({ msg: "Tweet no encontrado" });
    }
};

const deleteTweet = (request, response) => {
    const { id } = request.body;
    let tweets = getTweets();
    const tweetIndex = tweets.findIndex(tweet => tweet.id === id);

    if (tweetIndex !== -1) {
        tweets.splice(tweetIndex, 1);
        response.status(200).json({ msg: "Tweet eliminado" });
    } else {
        response.status(404).json({ msg: "Tweet no encontrado" });
    }
};

module.exports = {
    listTweets,
    publishTweet,
    updateTweet,
    deleteTweet,
};
