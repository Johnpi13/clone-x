const tweets = require('../mocked_data/tweets');
const { getCollection } = require('../config/db');
const { text } = require('express');

const getTweets = () => {
    if (tweets) {
        return tweets
    }

    return [];
}

const createTweet = (tweet) => {
    const collection = getCollection('tweets');
    collection.insertOne(tweet)

    return {
        success: true,
        tweet
    }
}
module.exports = {
    getTweets,
    createTweet
};
