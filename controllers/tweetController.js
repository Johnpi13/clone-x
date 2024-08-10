const getTweets = require('../services/tweetService')

const publishTweet = (request, response) => {
  response.json({ msg: "Tweet published"});
};

const listTweets = (request, response) => {
  let tweets = getTweets()
  response.json(tweets);
};
const updateTweet = (request, response) => {
  response.json({ msg: "Tweet updated"});
};
const deleteTweet = (request, response) => {
  response.json({ msg: "Tweet deleted"});
};

module.exports = {
  publishTweet,
  listTweets,
  updateTweet,
  deleteTweet,
};
