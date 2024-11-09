const tweets = require('../mocked_data/tweets');
const { getCollection } = require('../config/db');
const { text } = require('express');

const getTweets = () => {
    if (tweets) {
        return tweets
    }

    return [];
}

module.exports = {
    getTweets
};
