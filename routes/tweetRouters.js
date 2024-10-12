const express = require("express");
const tweetRouter = express.Router();

const { publishTweet, listTweets, updateTweet, deleteTweet } = require("../controllers/tweetController");
const { publishTweetValidation } = require('../validations/tweetValidations');

/**
 * @swagger
 * /tweets:
 *   get:
 *     summary: Obtiene los tweets del usuario autenticado
 *     tags: [Tweets]
 *     responses:
 *       200:
 *         description: Lista de tweets del usuario
 *       500:
 *         description: Error al obtener los tweets
 */


tweetRouter.get("/", listTweets);
tweetRouter.post("/", publishTweetValidation, publishTweet);
tweetRouter.put("/", updateTweet);
tweetRouter.delete("/", deleteTweet);

module.exports = tweetRouter;
