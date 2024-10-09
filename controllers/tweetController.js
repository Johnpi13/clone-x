const Tweet = require('../models/tweetSchema');
const tweetService = require('../services/tweetService');

const listTweets = async (request, response) => {
    try {
        const userId = request.user.id;

        const tweets = await Tweet.find({ userId: userId });

        response.status(200).json(tweets);
    } catch (err) {
        response.status(500).json({ message: 'Error al obtener los tweets', error: err });
    }
};

const publishTweet = async (request, response) => {
    try {
        console.log("User from request:", request.user);
        const userName = request.user;
        const userId = request.user.id;
        const { body } = request.body;

        const newTweet = new Tweet({
            userId: userId,
            userName: userName,
            body: body
        });


        const result = tweetService.createTweet(newTweet);

        response.status(201).json(result);
    }
    catch (err) {
        response.status(500).json({
            success: false,
            err: err.message  || 'Error al guardar el tweet'
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
