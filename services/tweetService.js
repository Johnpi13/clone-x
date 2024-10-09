const tweets = require('../mocked_data/tweets');

const getTweets = () => {
    if (tweets) {
        return tweets
    }

    return [];
}

module.exports = {
    getTweets
};
