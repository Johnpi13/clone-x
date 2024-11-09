const express = require("express")
const registerRouter = express.Router()

const { registerUser } = require("../controllers/registerController.js");
const { registerValidation } = require("../validations/registerValidations.js");

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Registra un nuevo usuario
 *     tags: [Usuarios]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *               userName:
 *                 type: string
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuario registrado exitosamente
 *       400:
 *         description: Error en la validación de los datos
 *       500:
 *         description: Error al registrar el usuario
 */

registerRouter.post("/register", registerValidation, registerUser);

module.exports = registerRouter