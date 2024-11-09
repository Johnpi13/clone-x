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

/**
 * @swagger
 * tags:
 *   name: Tweets
 *   description: API para gestionar tweets
 */

/**
 * @swagger
 * /tweets:
 *   get:
 *     summary: Obtiene los tweets del usuario autenticado
 *     tags: [Tweets]
 *     responses:
 *       200:
 *         description: Lista de tweets del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 tweets:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Tweet'
 *       500:
 *         description: Error al obtener los tweets
 */
tweetRouter.get("/", tweetController.listTweets);
/**
 * @swagger
 * /tweets:
 *   post:
 *     summary: Publica un nuevo tweet
 *     tags: [Tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               body:
 *                 type: string
 *                 description: Contenido del tweet
 *                 example: "Este es un nuevo tweet"
 *     responses:
 *       201:
 *         description: Tweet publicado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 newTweet:
 *                   $ref: '#/components/schemas/Tweet'
 *       500:
 *         description: Error al guardar el tweet
 */
tweetRouter.post("/", publishTweetValidation, tweetController.publishTweet);
/**
 * @swagger
 * /tweets:
 *   put:
 *     summary: Actualiza un tweet existente
 *     tags: [Tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del tweet a actualizar
 *                 example: "60c72b2f4f1a2c001f5d8f8e"
 *               body:
 *                 type: string
 *                 description: Nuevo contenido del tweet
 *                 example: "Este tweet ha sido actualizado"
 *     responses:
 *       200:
 *         description: Tweet actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Tweet actualizado"
 *                 tweet:
 *                   $ref: '#/components/schemas/Tweet'
 *       404:
 *         description: Tweet no encontrado
 */
tweetRouter.put("/", tweetController.updateTweet);
/**
 * @swagger
 * /tweets:
 *   delete:
 *     summary: Elimina un tweet
 *     tags: [Tweets]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: ID del tweet a eliminar
 *                 example: "60c72b2f4f1a2c001f5d8f8e"
 *     responses:
 *       200:
 *         description: Tweet eliminado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: "Tweet eliminado"
 *       404:
 *         description: Tweet no encontrado
 */
tweetRouter.delete("/", tweetController.deleteTweet);

module.exports = tweetRouter;
