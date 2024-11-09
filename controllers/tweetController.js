const Tweet = require('../models/tweetSchema');
const tweetService = require('../services/tweetService');

const listTweets = async (request, response) => {
    try {
        const userName = request.baseUrl.replace('/', '');

        const tweets = await Tweet.find({ userName: userName }).sort({ createdAt: -1 });

        response.status(200).json({
            success: true,
            tweets
        });
    } catch (err) {
        response.status(500).json({ message: 'Error al obtener los tweets', error: err });
    }
};

const publishTweet = async (request, response) => {
    try {
        const userName = request.user;
        const { body } = request.body;

        const newTweet = new Tweet({
            userName: userName,
            body: body
        });

        newTweet.save()
        response.status(201).json({
            success: true,
            newTweet
        });
    }
    catch (err) {
        response.status(500).json({
            success: false,
            err: err.message || 'Error al guardar el tweet'
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
