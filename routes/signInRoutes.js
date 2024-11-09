const express = require("express")
const signInRouter = express.Router()

const { logout } = require("../controllers/signInController");
const { signInUser } = require("../controllers/signInController");
const { signInValidation } = require("../validations/signUpValidations");

signInRouter.get("/logout", logout);
/**
 * @swagger
 * /signin:
 *   post:
 *     summary: Inicia sesión de usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userName:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       401:
 *         description: Credenciales inválidas
 */

signInRouter.post("/signin", signInValidation, signInUser);

module.exports = signInRouter