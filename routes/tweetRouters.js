const express = require("express");
const tweetRouter = express.Router();

const tweetController = require("../controllers/tweetController");
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


tweetRouter.get("/", tweetController.listTweets);
tweetRouter.post("/", publishTweetValidation, tweetController.publishTweet);
tweetRouter.put("/", tweetController.updateTweet);
tweetRouter.delete("/", tweetController.deleteTweet);

module.exports = tweetRouter;
